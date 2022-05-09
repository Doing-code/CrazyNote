module.exports = {
    port: "4825",
    dest: "/docs",
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
            title: "forbearance",
            description: "Patience, restraint and tolerance"
        }
    },
    head: [
        // ico
        ["link", {rel: "icon", href: `/favicon.ico`}],
        ["link", {rel: "apple-touch-icon", href: `/apple-touch-icon.png`}],
        ["link", {rel: "icon", href: `/favicon-32x32.png"`}],
        ["link", {rel: "manifest", href: `/site.webmanifest`}],
        // meta
        ["meta", {name: "robots", content: "all"}],
        ["meta", {name: "author", content: "Lee"}],
        ["meta", {"http-equiv": "Cache-Control", content: "no-cache, no-store, must-revalidate"}],
        ["meta", {"http-equiv": "Pragma", content: "no-cache"}],
        ["meta", {"http-equiv": "Expires", content: "0"}],
        ["meta", {
            name: "keywords",
            content: "forbearance"
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
        // ['@vuepress/back-to-top', true], // replaced with inject page-sidebar
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
        smoothScroll: true,
        locales: {
            "/": {
                label: "简体中文",
                selectText: "Languages",
                editLinkText: "编辑此页",
                lastUpdated: "上次更新",
                nav: [
                    {
                        text: '408',
                        items: [
                            {
                                text: '数据结构',
                                link: '/md/408/datastructure/helloworld.md'
                            },
                            {
                                text: '计算机组成原理',
                                link: '/md/408/network/helloworld.md'
                            },
                            {
                                text: '计算机操作系统',
                                link: '/md/408/os/helloworld.md'
                            },
                            {
                                text: '计算机网络',
                                link: '/md/408/principle/helloworld.md'
                            }
                        ]
                    },
                    {
                        text: 'Java基础',
                        items: [
                            {
                                text: 'Java',
                                items: [
                                    {
                                        text: 'Java基础',
                                        link: '/md/java/java/2022-05-09-第1章：Java是什么？.md'
                                    }
                                    // {
                                    //     text: 'jvm',
                                    //     link: ''
                                    // },
                                    // {
                                    //     text: 'jmm',
                                    //     link: ''
                                    // },
                                    // {
                                    //     text: '类装载机制',
                                    //     link: ''
                                    // },
                                    // {
                                    //     text: '多线程并发',
                                    //     link: ''
                                    // },
                                    // {
                                    //     text: 'IO',
                                    //     link: ''
                                    // },
                                    // {
                                    //     text: '网络编程',
                                    //     link: ''
                                    // },
                                ]
                            },
                            // {
                            //     text: '23种设计模式',
                            //     items: [
                            //         {
                            //             text: '创建型模式',
                            //             link: ''
                            //         },
                            //         {
                            //             text: '结构型模式',
                            //             link: ''
                            //         },
                            //         {
                            //             text: '行为型模式',
                            //             link: ''
                            //         }
                            //     ]
                            // },
                            // {
                            //     text: 'Linux',
                            //     items: [
                            //         {
                            //             text: 'Linux',
                            //             link: '/md/java/linux/2022-04-26-第一章：Linux 操作文件目录.md'
                            //         }
                            //     ]
                            // }
                        ]
                    },
                    // {
                    //     text: '数据库',
                    //     items: [
                    //         {
                    //             text: '关系型数据库',
                    //             items: [
                    //                 {
                    //                     text: 'MySQL',
                    //                     link: ''
                    //                 },
                    //                 {
                    //                     text: 'Oracle',
                    //                     link: ''
                    //                 }
                    //             ]
                    //         },
                    //         {
                    //             text: '非关系型数据库',
                    //             items: [
                    //                 {
                    //                     text: 'Redis',
                    //                     link: ''
                    //                 },
                    //                 {
                    //                     text: 'MongoDB',
                    //                     link: ''
                    //                 },
                    //                 {
                    //                     text: 'Memcache',
                    //                     link: ''
                    //                 },
                    //                 {
                    //                     text: 'Hbase',
                    //                     link: ''
                    //                 },
                    //                 {
                    //                     text: 'Opentsdb',
                    //                     link: ''
                    //                 }
                    //             ]
                    //         },
                    //     ]
                    // },
                    {
                        text: 'Spring',
                        items: [
                            {
                                text: 'Spring注解驱动',
                                link: '/md/spring/spring/2022-04-25-第1章：@Configuration和@Bean给容器中注册组件.md'
                            },
                            // {
                            //     text: 'SpringMVC',
                            //     link: ''
                            // },
                            // {
                            //     text: 'MyBatis',
                            //     link: ''
                            // },
                            // {
                            //     text: 'Spring Boot',
                            //     link: ''
                            // },
                            // {
                            //     text: 'Spring Cloud',
                            //     link: ''
                            // },
                            // {
                            //     text: 'Vertx',
                            //     link: ''
                            // }
                        ]
                    },
                    // {
                    //     text: '框架',
                    //     items: [
                    //         {
                    //             text: 'RPC-远程过程调用',
                    //             items: [
                    //                 {
                    //                     text: 'Dubbo',
                    //                     link: ''
                    //                 },
                    //                 {
                    //                     text: 'gRPC',
                    //                     link: ''
                    //                 },
                    //                 {
                    //                     text: 'Thrift',
                    //                     link: ''
                    //                 }
                    //             ]
                    //         },
                    //         {
                    //             text: '消息队列',
                    //             items: [
                    //                 {
                    //                     text: 'Kafka',
                    //                     link: ''
                    //                 }
                    //             ]
                    //         },
                    //         {
                    //             text: '搜索引擎',
                    //             items: [
                    //                 {
                    //                     text: 'Elasticsearch',
                    //                     link: ''
                    //                 }
                    //             ]
                    //         },
                    //         {
                    //             text: 'Netty 4.x',
                    //             items: [
                    //                 {
                    //                     text: 'Netty',
                    //                     link: ''
                    //                 }
                    //             ]
                    //         },
                    //     ]
                    // },
                    // {
                    //     text: '网络协议',
                    //     items: [
                    //         {
                    //             text: 'TCP/IP',
                    //             link: ''
                    //         },
                    //         {
                    //             text: 'HTTP',
                    //             link: ''
                    //         },
                    //         {
                    //             text: 'UDP',
                    //             link: ''
                    //         }
                    //     ]
                    // },
                    // {
                    //     text: '微服务',
                    //     items: [
                    //         {
                    //             text: '服务注册中心',
                    //             items: [
                    //                 {
                    //                     text: 'Zookeeper',
                    //                     link: ''
                    //                 },
                    //                 {
                    //                     text: 'Consul',
                    //                     link: ''
                    //                 },
                    //                 {
                    //                     text: 'Eureka',
                    //                     link: ''
                    //                 }
                    //             ]
                    //         },
                    //         {
                    //             text: '服务调用',
                    //             items: [
                    //                 {
                    //                     text: 'Ribbon',
                    //                     link: ''
                    //                 },
                    //                 {
                    //                     text: 'LoadBalancer',
                    //                     link: ''
                    //                 },
                    //                 {
                    //                     text: 'OpenFeign',
                    //                     link: ''
                    //                 }
                    //             ]
                    //         },
                    //         {
                    //             text: '服务降级',
                    //             items: [
                    //                 {
                    //                     text: 'resilience4j',
                    //                     link: ''
                    //                 },
                    //                 {
                    //                     text: 'sentinel',
                    //                     link: ''
                    //                 }
                    //             ]
                    //         },
                    //         {
                    //             text: '服务网关',
                    //             items: [
                    //                 {
                    //                     text: 'gateway',
                    //                     link: ''
                    //                 },
                    //                 {
                    //                     text: 'Zuul2',
                    //                     link: ''
                    //                 }
                    //             ]
                    //         },
                    //         {
                    //             text: '服务配置',
                    //             items: [
                    //                 {
                    //                     text: 'Apollo',
                    //                     link: ''
                    //                 },
                    //                 {
                    //                     text: 'Nacos',
                    //                     link: ''
                    //                 }
                    //             ]
                    //         }
                    //     ]
                    // },
                    // {
                    //     text: '容器',
                    //     items: [
                    //         {
                    //             text: 'Kubernetes',
                    //             link: ''
                    //         },
                    //         {
                    //             text: 'Docker',
                    //             link: ''
                    //         }
                    //     ]
                    // },
                    // {
                    //     text: 'web服务器',
                    //     items: [
                    //         {
                    //             text: 'Tomcat',
                    //             link: ''
                    //         },
                    //         {
                    //             text: 'Jboss',
                    //             link: ''
                    //         },
                    //         {
                    //             text: 'Nginx',
                    //             link: ''
                    //         },
                    //         {
                    //             text: 'OpenResty',
                    //             link: ''
                    //         },
                    //         {
                    //             text: 'Weblogic',
                    //             link: ''
                    //         }
                    //     ]
                    // },
                    // {
                    //     text: 'tools',
                    //     items: [
                    //         {
                    //             text: '部署',
                    //             items: [
                    //                 {
                    //                     text: 'Jenkins',
                    //                     link: ''
                    //                 },
                    //                 {
                    //                     text: 'Gitlab',
                    //                     link: ''
                    //                 }
                    //             ]
                    //         },
                    //         {
                    //             text: '项目管理工具',
                    //             items: [
                    //                 {
                    //                     text: 'Maven',
                    //                     link: '/md/about/maven/about-me.md'
                    //                 },
                    //                 {
                    //                     text: 'Gradle',
                    //                     link: '/md/about/maven/about-me.md'
                    //                 }
                    //             ],
                    //
                    //         },
                    //         {
                    //             text: '版本控制工具',
                    //             items: [
                    //                 {
                    //                     text: 'Git',
                    //                     link: '/md/tools/git/2022-04-26-第一章：Git 概述.md'
                    //                 }
                    //             ]
                    //         }
                    //     ]
                    // },
                    {
                        text: 'Github',
                        link: 'https://github.com/Doing-code/CrazyNote'
                    }
                ],
                sidebar: {
                    "/md/spring/spring/": getBarFrameworkTheSpring(),
                    "/md/java/linux": getBarOperatingSystemTheLinux(),
                    "/md/tools/git/": getBarToolsTheGit(),
                    '/md/java/java/': getBarJavaTheJava()
                }
            }
        }
    }
}

function getBarFrameworkTheSpring() {
    return [
        {
            title: "组件注入",
            collapsable: false,
            sidebarDepth: 0,
            children: [
                "2022-04-25-第1章：@Configuration和@Bean给容器中注册组件.md",
                "2022-04-26-第2章：@ComponentScan-自动扫描组件&指定扫描规则.md",
                "2022-04-28-第3章：自定义TypeFilter指定过滤规则.md",
                "2022-05-04-第4章：@Scope-设置组件作用域.md",
                "2022-05-05-第5章：@Lazy-bean的懒加载.md",
                "2022-05-06-第6章：@Conditional-按照条件注册bean.md",
                "2022-05-08-第7章：@Import-给容器中快速导入一个组件.md",
                "2022-05-08-第8章：@Import-使用ImportSelector.md",
                "2022-05-08-第9章：@Import-使用ImportBeanDefinitionRegistrar.md",
                "2022-05-08-第10章：使用FactoryBean注册组件.md"
            ]
        },
        {
            title: "生命周期",
            collapsable: false,
            sidebarDepth: 0,
            children: [
                "2022-05-08-第11章：@Bean指定初始化和销毁方法.md",
                "2022-05-08-第12章： InitializingBean和DisposableBean.md",
                "2022-05-09-第13章：@PostConstruct&@PreDestroy.md",
                "2022-05-09-第14章：BeanPostProcessor后置处理器.md"
            ]
        },
        {
            title: "属性赋值",
            collapsable: false,
            sidebarDepth: 0,
            children: []
        },
        {
            title: "自动装配",
            collapsable: false,
            sidebarDepth: 0,
            children: []
        },
        {
            title: "源码解析",
            collapsable: false,
            sidebarDepth: 0,
            children: [
                "2022-04-20：Bean的初始化.md"
            ]
        }
    ]
}

function getBarJavaTheJava() {
    return [
        {
            title: "Java概述",
            collapsable: false,
            sidebarDepth: 0,
            children: [
                "2022-05-09-第1章：Java是什么？.md",
                "2022-05-09-第2章：Java的特点.md",
                "2022-05-09-第3章：JDK、JRE、JVM的关系.md"
            ]
        },
        {
            title: "基本语法",
            collapsable: false,
            sidebarDepth: 0,
            children: []
        },
        {
            title: "数组",
            collapsable: false,
            sidebarDepth: 0,
            children: []
        },
        {
            title: "面向对象",
            collapsable: false,
            sidebarDepth: 0,
            children: []
        },
        {
            title: "异常处理",
            collapsable: false,
            sidebarDepth: 0,
            children: []
        },
        {
            title: "常用API",
            collapsable: false,
            sidebarDepth: 0,
            children: []
        },
        {
            title: "枚举与注解",
            collapsable: false,
            sidebarDepth: 0,
            children: []
        },
        {
            title: "集合",
            collapsable: false,
            sidebarDepth: 0,
            children: []
        },
        {
            title: "泛型与IO",
            collapsable: false,
            sidebarDepth: 0,
            children: []
        },
        {
            title: "反射",
            collapsable: false,
            sidebarDepth: 0,
            children: []
        },
        {
            title: "Java8的新特性",
            collapsable: false,
            sidebarDepth: 0,
            children: []
        },
        {
            title: "Java8之后版本的新特性",
            collapsable: false,
            sidebarDepth: 0,
            children: []
        }
    ]
}

function getBarOperatingSystemTheLinux() {
    return [
        {
            title: "实操篇",
            collapsable: false,
            sidebarDepth: 0,
            children: [
                "2022-04-26-第一章：Linux 操作文件目录.md"
            ]
        },
        {
            title: "扩展篇",
            collapsable: false,
            sidebarDepth: 0,
            children: []
        }
    ]
}

function getBarToolsTheGit() {
    return [
        {
            title: "Git",
            collapsable: false,
            sidebarDepth: 0,
            children: [
                "2022-04-26-第一章：Git 概述.md",
                "2022-04-26-第二章：Git 常用命令.md",
                "2022-04-27-第三章：Git 分支操作.md"
            ]
        }
    ]
}


