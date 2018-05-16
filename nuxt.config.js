require('dotenv').config();

const nodeExternals = require('webpack-node-externals')

module.exports = {

    head: {
        titleTemplate: '%s - DasPeTeTutorials',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' }
        ],
        link: [
            { rel: 'stylesheet', href: '//fonts.googleapis.com/css?family=Noto+Sans:400,700' }
        ]
    },

    css: [
        '~/assets/scss/styles.scss',
        { src: '~/node_modules/highlight.js/styles/atom-one-dark.css', lang: 'css' }
    ],

    plugins: [
        '~/plugins/vue-awesome',
        '~/plugins/components'
    ],

    modules: [
        '@nuxtjs/axios',
        '@nuxtjs/markdownit'
    ],

    build: {
        extend(config, { isServer }) {
            if (isServer) {
                config.externals = [
                    nodeExternals({ whitelist: [/es6-promise|\.(?!(?:js|json)$).{1,5}$/i, /^vue-awesome/] })
                ]
            }
        }
    },

    markdownit: {
        preset: 'default',
        linkify: true,
        breaks: true,
        use: [
            'markdown-it-highlightjs',
            'markdown-it-video',
            ['markdown-it-link-attributes', {
                pattern: /^http/,
                attrs: {
                    target: '_blank'
                }
            }],
        ] 
    }

}