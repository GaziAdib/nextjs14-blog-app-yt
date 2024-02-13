export { default } from 'next-auth/middleware'

export const config = {
    matcher: ['/', '/blogs/add-blog', '/blogs/update-blog/*'],
}