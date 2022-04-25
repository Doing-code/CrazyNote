module.exports = {
    port: "8080",
    dest: ".site",
    base: "/",
    // 是否开启默认预加载js
    shouldPrefetch: (file, type) => {
        return false;
    },
    // webpack 配置 https://vuepress.vuejs.org/zh/config/#chainwebpack
    chainWebpack: config => {
        if (process.env.NODE_ENV === 'production') {
            const dateTime = new Date().getTime();

            // 清除js版本号
            config.output.filename('assets/js/cg-[name].js?v=' + dateTime).end();
            config.output.chunkFilename('assets/js/cg-[name].js?v=' + dateTime).end();

            // 清除css版本号
            config.plugin('mini-css-extract-plugin').use(require('mini-css-extract-plugin'), [{
                filename: 'assets/css/[name].css?v=' + dateTime,
                chunkFilename: 'assets/css/[name].css?v=' + dateTime
            }]).end();

        }
    },
    markdown: {
        lineNumbers: true,
        externalLinks: {
            target: '_blank', rel: 'noopener noreferrer'
        }
    },
    locales: {
        "/": {
            lang: "zh-CN",
            title: "堆栈",
            description: "包含: 主流框架以及中间件的入门使用"
        }
    },
    head: [
        // ico
        ["link", {rel: "icon", href: `/favicon.ico`}],
        // meta
        ["meta", {name: "robots", content: "all"}],
        ["meta", {name: "author", content: "Lee"}],
        ["meta", {"http-equiv": "Cache-Control", content: "no-cache, no-store, must-revalidate"}],
        ["meta", {"http-equiv": "Pragma", content: "no-cache"}],
        ["meta", {"http-equiv": "Expires", content: "0"}],
        ["meta", {
            name: "keywords",
            content: "堆栈: Spring、RPC、面向Google编程."
        }],
        ["meta", {name: "apple-mobile-web-app-capable", content: "yes"}],
        ['script',
            {
                charset: 'utf-8',
                async: 'async',
                // src: 'https://code.jquery.com/jquery-3.5.1.min.js',
                src: '/js/jquery.min.js',
            }],
        ['script',
            {
                charset: 'utf-8',
                async: 'async',
                // src: 'https://code.jquery.com/jquery-3.5.1.min.js',
                src: '/js/global.js',
            }],
        ['script',
            {
                charset: 'utf-8',
                async: 'async',
                src: '/js/fingerprint2.min.js',
            }],
        ['script',
            {
                charset: 'utf-8',
                async: 'async',
                src: 'https://s9.cnzz.com/z_stat.php?id=1278232949&web_id=1278232949',
            }],
        // 添加百度统计
        ["script", {},
            `
              var _hmt = _hmt || [];
              (function() {
                var hm = document.createElement("script");
                hm.src = "https://hm.baidu.com/hm.js?0b31b4c146bf7126aed5009e1a4a11c8";
                var s = document.getElementsByTagName("script")[0];
                s.parentNode.insertBefore(hm, s);
              })();
            `
        ]
    ],
    plugins: [
        [
            {globalUIComponents: ['LockArticle', 'PayArticle']}
        ],
        // ['@vssue/vuepress-plugin-vssue', {
        //     platform: 'github-v3', //v3的platform是github，v4的是github-v4
        //     // 其他的 Vssue 配置
        //     owner: 'fuzhengwei', //github账户名
        //     repo: 'CodeGuide', //github一个项目的名称
        //     clientId: 'df8beab2190bec20352a',//注册的Client ID
        //     clientSecret: '7eeeb4369d699c933f02a026ae8bb1e2a9c80e90',//注册的Client Secret
        //     autoCreateIssue: true // 自动创建评论，默认是false，最好开启，这样首次进入页面的时候就不用去点击创建评论的按钮了。
        // }
        // ],
        // ['@vuepress/back-to-top', true], replaced with inject page-sidebar
        ['@vuepress/medium-zoom', {
            selector: 'img:not(.nozoom)',
            // See: https://github.com/francoischalifour/medium-zoom#options
            options: {
                margin: 16
            }
        }],
        // https://v1.vuepress.vuejs.org/zh/plugin/official/plugin-pwa.html#%E9%80%89%E9%A1%B9
        ['@vuepress/pwa', {
            serviceWorker: true,
            updatePopup: {
                '/': {
                    message: "发现新内容可用",
                    buttonText: "刷新"
                },
            }
        }],
        // see: https://vuepress.github.io/zh/plugins/copyright/#%E5%AE%89%E8%A3%85
        // ['copyright', {
        //     noCopy: false, // 允许复制内容
        //     minLength: 100, // 如果长度超过 100 个字符
        //     authorName: "https://bugstack.cn",
        //     clipboardComponent: "请注明文章出处, [bugstack虫洞栈](https://bugstack.cn)"
        // }],
        // see: https://github.com/ekoeryanto/vuepress-plugin-sitemap
        // ['sitemap', {
        //     hostname: 'https://bugstack.cn'
        // }],
        // see: https://github.com/IOriens/vuepress-plugin-baidu-autopush
        ['vuepress-plugin-baidu-autopush', {}],
        // see: https://github.com/znicholasbrown/vuepress-plugin-code-copy
        ['vuepress-plugin-code-copy', {
            align: 'bottom',
            color: '#3eaf7c',
            successText: '代码已经复制到剪贴板'
        }],
        // see: https://github.com/tolking/vuepress-plugin-img-lazy
        ['img-lazy', {}],
        ["vuepress-plugin-tags", {
            type: 'default', // 标签预定义样式
            color: '#42b983',  // 标签字体颜色
            border: '1px solid #e2faef', // 标签边框颜色
            backgroundColor: '#f0faf5', // 标签背景颜色
            selector: '.page .content__default h1' // ^v1.0.1 你要将此标签渲染挂载到哪个元素后面？默认是第一个 H1 标签后面；
        }],
        // https://github.com/lorisleiva/vuepress-plugin-seo
        ["seo", {
            siteTitle: (_, $site) => $site.title,
            title: $page => $page.title,
            description: $page => $page.frontmatter.description,
            author: (_, $site) => $site.themeConfig.author,
            tags: $page => $page.frontmatter.tags,
            // twitterCard: _ => 'summary_large_image',
            type: $page => 'article',
            url: (_, $site, path) => ($site.themeConfig.domain || '') + path,
            image: ($page, $site) => $page.frontmatter.image && (($site.themeConfig.domain && !$page.frontmatter.image.startsWith('http') || '') + $page.frontmatter.image),
            publishedAt: $page => $page.frontmatter.date && new Date($page.frontmatter.date),
            modifiedAt: $page => $page.lastUpdated && new Date($page.lastUpdated),
        }]
    ],
    themeConfig: {
        docsRepo: "Doing-code/CrazyNote",
        // 编辑文档的所在目录
        docsDir: 'docs',
        // 文档放在一个特定的分支下：
        docsBranch: 'master',
        //logo: "/logo.png",
        editLinks: true,
        sidebarDepth: 0,
        //smoothScroll: true,
        locales: {
            "/": {
                label: "简体中文",
                selectText: "Languages",
                editLinkText: "在 GitHub 上编辑此页",
                lastUpdated: "上次更新",
                nav: [
                    {
                        text: 'Java',
                        items: [
                            {
                                text: 'jvm',
                                link: 'md/about/me/about-me.md'
                            },
                            {
                                text: 'jmm',
                                link: 'md/about/me/about-me.md'
                            },
                            {
                                text: '类装载机制',
                                link: 'md/about/me/about-me.md'
                            },
                            {
                                text: '多线程并发',
                                link: 'md/about/me/about-me.md'
                            },
                            {
                                text: 'IO',
                                link: 'md/about/me/about-me.md'
                            },
                            {
                                text: '网络编程',
                                link: 'md/about/me/about-me.md'
                            },
                            {
                                text: '23设计模式',
                                link: 'md/about/me/about-me.md'
                            }
                        ]
                    },
                    {
                        text: '数据库',
                        items: [
                            {
                                text: 'MySQL',
                                link: 'md/about/me/about-me.md'
                            },
                            {
                                text: 'Oracle',
                                link: 'md/about/me/about-me.md'
                            },
                            {
                                text: 'Redis',
                                link: 'md/about/me/about-me.md'
                            },
                            {
                                text: 'MongoDB',
                                link: 'md/about/me/about-me.md'
                            },
                            {
                                text: 'Memcache',
                                link: 'md/about/me/about-me.md'
                            },
                            {
                                text: 'Hbase',
                                link: 'md/about/me/about-me.md'
                            },
                            {
                                text: 'Opentsdb',
                                link: 'md/about/me/about-me.md'
                            }
                        ]
                    },
                    {
                        text: '框架',
                        items: [
                            {
                                text: 'Spring',
                                link: 'md/about/me/about-me.md'
                            },
                            {
                                text: 'SpringMVC',
                                link: 'md/about/me/about-me.md'
                            },
                            {
                                text: 'MyBatis',
                                link: 'md/about/me/about-me.md'
                            },
                            {
                                text: 'Spring Boot',
                                link: 'md/about/me/about-me.md'
                            },
                            {
                                text: 'Spring Cloud',
                                link: 'md/about/me/about-me.md'
                            },
                            {
                                text: 'Vertx',
                                link: 'md/about/me/about-me.md'
                            }
                        ]
                    },
                    {
                        text: 'RPC',
                        items: [
                            {
                                text: 'Dubbo',
                                link: 'md/about/me/about-me.md'
                            },
                            {
                                text: 'gRPC',
                                link: 'md/about/me/about-me.md'
                            },
                            {
                                text: 'Thrift',
                                link: 'md/about/me/about-me.md'
                            }
                        ]
                    },
                    {
                        text: '微服务',
                        items: [
                            {
                                text: 'Nacos',
                                link: 'md/about/me/about-me.md'
                            },
                            {
                                text: '服务注册中心',
                                items: [
                                    {
                                        text: 'Zookeeper',
                                        link: 'md/about/me/about-me.md'
                                    },
                                    {
                                        text: 'Consul',
                                        link: 'md/about/me/about-me.md'
                                    },
                                    {
                                        text: 'Eureka',
                                        link: 'md/about/me/about-me.md'
                                    }
                                ]
                            },
                            {
                                text: '服务调用',
                                items: [
                                    {
                                        text: 'Ribbon',
                                        link: 'md/about/me/about-me.md'
                                    },
                                    {
                                        text: 'LoadBalancer',
                                        link: 'md/about/me/about-me.md'
                                    },
                                    {
                                        text: 'OpenFeign',
                                        link: 'md/about/me/about-me.md'
                                    }
                                ]
                            },
                            {
                                text: '服务降级',
                                items: [
                                    {
                                        text: 'resilience4j',
                                        link: 'md/about/me/about-me.md'
                                    },
                                    {
                                        text: 'sentinel',
                                        link: 'md/about/me/about-me.md'
                                    }
                                ]
                            },
                            {
                                text: '服务网关',
                                items: [
                                    {
                                        text: 'gateway',
                                        link: 'md/about/me/about-me.md'
                                    },
                                    {
                                        text: 'Zuul2',
                                        link: 'md/about/me/about-me.md'
                                    }
                                ]
                            },
                            {
                                text: '服务配置',
                                items: [
                                    {
                                        text: 'Apollo',
                                        link: 'md/about/me/about-me.md'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        text: '消息队列',
                        items: [
                            {
                                text: 'Kafka',
                                link: 'md/about/me/about-me.md'
                            }
                        ]
                    },
                    {
                        text: '容器',
                        items: [
                            {
                                text: 'Kubernetes',
                                link: 'md/about/me/about-me.md'
                            },
                            {
                                text: 'Docker',
                                link: 'md/about/me/about-me.md'
                            }
                        ]
                    },
                    {
                        text: '操作系统',
                        items: [
                            {
                                text: 'Linux',
                                link: 'md/about/me/about-me.md'
                            },
                            {
                                text: 'Shell 脚本',
                                link: 'md/about/me/about-me.md'
                            }
                        ]
                    },
                    {
                        text: 'web服务器',
                        items: [
                            {
                                text: 'Tomcat',
                                link: 'md/about/me/about-me.md'
                            },
                            {
                                text: 'Jboss',
                                link: 'md/about/me/about-me.md'
                            },
                            {
                                text: 'Nginx',
                                link: 'md/about/me/about-me.md'
                            },
                            {
                                text: 'OpenResty',
                                link: 'md/about/me/about-me.md'
                            },
                            {
                                text: 'Weblogic',
                                link: 'md/about/me/about-me.md'
                            }
                        ]
                    },
                    {
                        text: '网络编程',
                        items: [
                            {
                                text: 'Netty',
                                link: 'md/about/me/about-me.md'
                            }
                        ]
                    },
                    {
                        text: '搜索引擎',
                        items: [
                            {
                                text: 'Elasticsearch',
                                link: 'md/about/me/about-me.md'
                            }
                        ]
                    },
                    {
                        text: '部署',
                        items: [
                            {
                                text: 'Jenkins',
                                link: 'md/about/me/about-me.md'
                            },
                            {
                                text: 'Gitlab',
                                link: 'md/about/me/about-me.md'
                            }
                        ]
                    },
                    {
                        text: 'tools',
                        items: [
                            {
                                text: '项目管理工具',
                                items: [
                                    {
                                        text: 'maven',
                                        link: 'md/about/me/about-me.md'
                                    },
                                    {
                                        text: 'Gradle',
                                        link: 'md/about/me/about-me.md'
                                    }
                                ],

                            },

                            {
                                text: '版本控制工具',
                                items: [
                                    {
                                        text: 'git',
                                        link: 'md/about/me/about-me.md'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        text: '网络协议',
                        items: [
                            {
                                text: 'TCP/IP',
                                link: 'md/about/me/about-me.md'
                            }
                        ]
                    },
                    {
                        text: '关于',
                        items: [
                            {
                                text: 'about',
                                link: 'md/about/me/about-me.md'
                            }
                        ]
                    },
                    {
                        text: 'Github',
                        link: 'https://github.com/Doing-code/CrazyNote'
                    }
                ],
                sidebar: {
                    
                }
            }
        }
    }
}
