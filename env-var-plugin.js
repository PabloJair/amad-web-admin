const myOrgEnvRegex = /^AMAD/i;

const envVarPlugin = {
  name: 'env-var-plugin',
  setup(build) {
    console.log("environments")

    const options = build.initialOptions;

    const envVars = {};
    for (const key in process.env) {
      if (myOrgEnvRegex.test(key)) {
        envVars[key] = process.env[key];
      }
      console.log(key)

    }

    options.define['process.env'] = JSON.stringify(envVars);

  },
};

module.exports = envVarPlugin;