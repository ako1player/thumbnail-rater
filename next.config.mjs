/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: 'careful-mandrill-521.convex.cloud',
            }
        ]
    }
};

export default nextConfig;
