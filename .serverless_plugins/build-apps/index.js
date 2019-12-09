"use strict";

const fs = require("fs");
const glob = require("glob");
const execSync = require("child_process").execSync;
const substitutionRegex = /%CF:(.+)%/gi;
const envConfigPath = "/src";

/*
 Steps:
    1. Glob scan /app
    2. Read in each environment.cf.ts contents
    3. Get CF output
        new aws.CloudFormation({ region }).describeStacks({ stackName })
    4. Save all output key:value pairs
    5. Regex replace func
        a. %CF:outkey% -> outval
    6. Save environment.ts with replacements
    7. execSync: npm install
    8. execSync: ng build --configuration=cf
        a. make sure angular.json is setup to support this
*/

const apps = [];
const cfOutputs = {};
const environmentConfigs = {};

const loadAppData = () => {
  // find apps
  let appPaths = glob.sync("apps/!(*.md)");

  console.log("Apps Found: ", appPaths);

  // read in configs
  appPaths.forEach(appPath => {
    apps.push(appPath);
    environmentConfigs[appPath] = {
      before: fs.readFileSync(
        appPath + `${envConfigPath}/config-src.js`,
        "utf-8"
      ),
      after: null
    };
  });
};

const loadCfOutput = async (stackName, region, profile, sls, provider) => {
  const response = await provider.request('CloudFormation', 'describeStacks', { StackName: stackName })
  const outputs = response.Stacks[0].Outputs;
  outputs.forEach(o => {
    cfOutputs[o.OutputKey] = o.OutputValue;
  });
};

const performSubstitutions = () => {
  let replaceFunc = match => {
    let cfOutputKey = match.replace(/%/g, "").split(":")[1];
    return cfOutputs[cfOutputKey];
  };
  apps.forEach(app => {
    environmentConfigs[app].after = environmentConfigs[app].before.replace(
      substitutionRegex,
      replaceFunc
    );
  });
};

const writeChangesToDisk = () => {
  apps.forEach(app => {
    fs.writeFileSync(
      app + envConfigPath + "/config.js",
      environmentConfigs[app].after
    );
    console.log(`Wrote env substitution to disk for app: ${app}.`);
  });
};

const runAppCmd = (cmd, app) => {
  execSync(cmd, {
    cwd: app,
    stdio: "inherit"
  });
};

const buildApps = sls => {
  const installDeps = app => {
    console.log();
    sls.cli.log(`${app}: Installing dependencies from package-lock ... `);
    runAppCmd("npm ci", app);
    console.log();
  };
  const angularBuild = app => {
    console.log();
    sls.cli.log(`${app}: Building ... `);
    runAppCmd("npm run build", app);
    console.log();
  };
  for (const app of apps) {
    installDeps(app);
    angularBuild(app);
  }
};

const cleanupNodeModules = () => {
  for (const app of apps) {
    console.log();
    runAppCmd("rm -rf node_modules", app);
    console.log();
  }
};

const doWork = async (sls, provider) => {
  sls.cli.log("Building and deploying Angular webapps ...");
  loadAppData();
  await loadCfOutput(
    sls.service.provider.stackName,
    sls.service.provider.region,
    sls.service.provider.profile,
    sls,
    provider
  );
  performSubstitutions();
  writeChangesToDisk();
  buildApps(sls);
  cleanupNodeModules();
};

class TaleBuildApps {
  constructor(serverless) {
    this.serverless = serverless;
    this.provider = this.serverless.getProvider("aws")
    this.commands = {
      taleBuildApps: {
        usage: "Build Angular Apps",
        lifecycleEvents: ["buildApps"],
        options: {
          message: {}
        }
      },
      taleBuildAndDeployApps: {
        usage: "Build and Deploy Angular Apps",
        lifecycleEvents: ["buildApps", "deployApps", "cognitoSetup"],
        options: {
          message: {}
        }
      }
    };
    this.hooks = {
      "after:deploy:deploy": () =>
        this.serverless.pluginManager.run(["taleBuildAndDeployApps"]),
      "taleBuildAndDeployApps:buildApps": doWork.bind(this, serverless, this.provider),
      "taleBuildApps:buildApps": doWork.bind(this, serverless, this.provider)
    };
  }
}
module.exports = TaleBuildApps;
