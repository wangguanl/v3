export default (config) => {
  let configs = []
  if (Array.isArray(config)) {
    configs = config;
  } else {
    for (let key in config) {
      configs.push({
        key,
        ...config[key],
      });
    }
  }
  return configs;
}