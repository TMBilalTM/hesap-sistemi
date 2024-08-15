module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['avatars.githubusercontent.com','banner2.cleanpng.com','encrypted-tbn0.gstatic.com','www.apple.com','via.placeholder.com'], 
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
        net: false,
        tls: false,
        dns: false,
        http: false,
        https: false,
        stream: false,
        buffer: false,
        path: false,
        os: false,
      };
    }
    return config;
  },
};
