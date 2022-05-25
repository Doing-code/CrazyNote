module.exports = {
    port: "8081",
    dest: "/dist",
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
                                    },
                                    {
                                        text: 'jvm',
                                        link: '1'
                                    },
                                    {
                                        text: 'jmm',
                                        link: '2'
                                    },
                                    {
                                        text: '类装载机制',
                                        link: '3'
                                    },
                                    {
                                        text: '多线程并发',
                                        link: '4'
                                    },
                                    {
                                        text: 'IO',
                                        link: '5'
                                    },
                                    {
                                        text: '网络编程',
                                        link: '6'
                                    },
                                ]
                            },
                            {
                                text: '23种设计模式',
                                items: [
                                    {
                                        text: '创建型模式',
                                        link: '8'
                                    },
                                    {
                                        text: '结构型模式',
                                        link: '9'
                                    },
                                    {
                                        text: '行为型模式',
                                        link: '10'
                                    }
                                ]
                            },
                            {
                                text: 'Linux',
                                items: [
                                    {
                                        text: 'Linux',
                                        link: '/md/java/linux/2022-05-11-第1章：ls-显示指定工作目录下的文件及属性信息.md'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        text: '数据库',
                        items: [
                            {
                                text: '关系型数据库',
                                items: [
                                    {
                                        text: 'MySQL',
                                        link: '11'
                                    },
                                    {
                                        text: 'Oracle',
                                        link: '12'
                                    }
                                ]
                            },
                            {
                                text: '非关系型数据库',
                                items: [
                                    {
                                        text: 'Redis',
                                        link: '13'
                                    },
                                    {
                                        text: 'MongoDB',
                                        link: '14'
                                    },
                                    {
                                        text: 'Memcache',
                                        link: '15'
                                    },
                                    {
                                        text: 'Hbase',
                                        link: '16'
                                    },
                                    {
                                        text: 'Opentsdb',
                                        link: '17'
                                    }
                                ]
                            },
                        ]
                    },
                    {
                        text: 'Spring',
                        items: [
                            {
                                text: 'Spring注解驱动',
                                link: '/md/spring/develop-spring/2022-04-25-01-@Configuration&@Bean-register-component.md'
                            },
                            {
                                text: 'SpringMVC',
                                link: '18'
                            },
                            {
                                text: 'MyBatis',
                                link: '19'
                            },
                            {
                                text: 'Spring Boot',
                                link: '20'
                            },
                            {
                                text: 'Spring Cloud',
                                link: '21'
                            },
                            {
                                text: 'Vertx',
                                link: '22'
                            }
                        ]
                    },
                    {
                        text: '框架',
                        items: [
                            {
                                text: 'RPC-远程过程调用',
                                items: [
                                    {
                                        text: 'Dubbo',
                                        link: '23'
                                    },
                                    {
                                        text: 'gRPC',
                                        link: '24'
                                    },
                                    {
                                        text: 'Thrift',
                                        link: '25'
                                    }
                                ]
                            },
                            {
                                text: '消息队列',
                                items: [
                                    {
                                        text: 'Kafka',
                                        link: '26'
                                    }
                                ]
                            },
                            {
                                text: '搜索引擎',
                                items: [
                                    {
                                        text: 'Elasticsearch',
                                        link: '27'
                                    }
                                ]
                            },
                            {
                                text: 'Netty 4.x',
                                items: [
                                    {
                                        text: 'Netty',
                                        link: '28'
                                    }
                                ]
                            },
                        ]
                    },
                    {
                        text: '网络',
                        items: [
                            {
                                text: '网络协议',
                                items: [
                                    {
                                        text: 'TCP/IP',
                                        link: '29'
                                    },
                                    {
                                        text: 'HTTP',
                                        link: '30'
                                    },
                                    {
                                        text: 'UDP',
                                        link: '31'
                                    },
                                    {
                                        text: 'Socks5',
                                        link: '99'
                                    }
                                ]
                            },
                            {
                                text: '网络编程实战',
                                items: [
                                    {
                                        text: 'Socks5代理',
                                        link: '999'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        text: '微服务',
                        items: [
                            {
                                text: '服务注册中心',
                                items: [
                                    {
                                        text: 'Zookeeper',
                                        link: '32'
                                    },
                                    {
                                        text: 'Consul',
                                        link: '33'
                                    },
                                    {
                                        text: 'Eureka',
                                        link: '34'
                                    }
                                ]
                            },
                            {
                                text: '服务调用',
                                items: [
                                    {
                                        text: 'Ribbon',
                                        link: '35'
                                    },
                                    {
                                        text: 'LoadBalancer',
                                        link: '36'
                                    },
                                    {
                                        text: 'OpenFeign',
                                        link: '37'
                                    }
                                ]
                            },
                            {
                                text: '服务降级',
                                items: [
                                    {
                                        text: 'resilience4j',
                                        link: '38'
                                    },
                                    {
                                        text: 'sentinel',
                                        link: '39'
                                    }
                                ]
                            },
                            {
                                text: '服务网关',
                                items: [
                                    {
                                        text: 'gateway',
                                        link: '40'
                                    },
                                    {
                                        text: 'Zuul2',
                                        link: '41'
                                    }
                                ]
                            },
                            {
                                text: '服务配置',
                                items: [
                                    {
                                        text: 'Apollo',
                                        link: '42'
                                    },
                                    {
                                        text: 'Nacos',
                                        link: '43'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        text: '容器',
                        items: [
                            {
                                text: 'Kubernetes',
                                link: '44'
                            },
                            {
                                text: 'Docker',
                                link: '45'
                            }
                        ]
                    },
                    {
                        text: 'web服务器',
                        items: [
                            {
                                text: 'Tomcat',
                                link: '46'
                            },
                            {
                                text: 'Jboss',
                                link: '47'
                            },
                            {
                                text: 'Nginx',
                                link: '48'
                            },
                            {
                                text: 'OpenResty',
                                link: '49'
                            },
                            {
                                text: 'Weblogic',
                                link: '50'
                            }
                        ]
                    },
                    {
                        text: 'tools',
                        items: [
                            {
                                text: '部署',
                                items: [
                                    {
                                        text: 'Jenkins',
                                        link: '51'
                                    },
                                    {
                                        text: 'Gitlab',
                                        link: '52'
                                    }
                                ]
                            },
                            {
                                text: '项目管理工具',
                                items: [
                                    {
                                        text: 'Maven',
                                        link: '53'
                                    },
                                    {
                                        text: 'Gradle',
                                        link: '54'
                                    }
                                ],

                            },
                            {
                                text: '版本控制工具',
                                items: [
                                    {
                                        text: 'Git',
                                        link: '/md/tools/git/2022-04-26-第一章：Git 概述.md'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        text: 'Github',
                        link: 'https://github.com/Doing-code/CrazyNote'
                    }
                ],
                sidebar: {
                    "/md/spring/develop-spring/": getBarFrameworkTheSpring(),
                    "/md/java/linux/": getBarOperatingSystemTheLinux(),
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
                "2022-04-25-01-@Configuration&@Bean-register-component.md",
                "2022-04-26-02-@ComponentScan-auto-or-specify-scanner-component.md",
                "2022-04-28-03-custom-TypeFilter.md",
                "2022-05-04-04-@Scope-set-component-scope.md",
                "2022-05-05-05-@Lazy-bean-lazy-loading.md",
                "2022-05-06-06-@Conditional-condition-register-bean.md",
                "2022-05-08-07-@Import-import-component.md",
                "2022-05-08-08-@Import-use-ImportSelector.md",
                "2022-05-08-09-@Import-use-ImportBeanDefinitionRegistrar.md",
                "2022-05-08-10-use-FactoryBean-register-component.md"
            ]
        },
        {
            title: "生命周期",
            collapsable: false,
            sidebarDepth: 0,
            children: [
                "2022-05-08-11-@Bean-specify-init&destroy.md",
                "2022-05-08-12-InitializingBean&DisposableBean.md",
                "2022-05-09-13-@PostConstruct&@PreDestroy.md",
                "2022-05-09-14-BeanPostProcessor.md",
                "2022-05-10-15-BeanPostProcessor-principle.md",
                "2022-05-11-16-BeanPostProcessor-apply-of-spring.md",
            ]
        },
        {
            title: "属性赋值",
            collapsable: false,
            sidebarDepth: 0,
            children: [
                "2022-05-12-17-@Value-assign.md",
                "2022-05-14-18-@PropertySource-load-external-config-file.md"
            ]
        },
        {
            title: "自动装配",
            collapsable: false,
            sidebarDepth: 0,
            children: [
                "2022-05-15-19-@Autowired&@Qualifier&@Primary.md",
                "2022-05-15-20-@Resource&@Inject.md",
                "2022-05-15-21-method&constructor-auto-wired.md",
                "2022-05-15-22-Aware-inject-component&principle.md",
                "2022-05-15-23-@Profile-register-by-environment-bean.md"
            ]
        },
        {
            title: "AOP原理",
            collapsable: false,
            sidebarDepth: 0,
            children: [
                "2022-05-15-24-@EnableAspectJAutoProxy.md",
                "2022-05-15-25-register-AnnotationAwareAspectJAutoProxyCreator.md",
                "2022-05-18-26-xml-spring-aop-source.md"
            ]
        },
        {
            title: "声明式事务",
            collapsable: false,
            sidebarDepth: 0,
            children: [
                "2022-05-22-27-@EnableTransactionManagement-principle.md",
                "2022-05-22-28-xml-transaction-principle.md"
            ]
        },
        // {
        //     title: "扩展原理",
        //     collapsable: false,
        //     sidebarDepth: 0,
        //     children: [
        //     ]
        // }
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
            title: "文件管理",
            collapsable: false,
            sidebarDepth: 0,
            children: [
                "2022-05-11-第1章：ls-显示指定工作目录下的文件及属性信息.md",
                "2022-05-11-第2章：cp-复制文件或目录.md",
                "2022-05-11-第3章：mkdir-创建目录文件.md",
                "2022-05-12-第4章：mv-移动文件或者修改文件名.md",
                "2022-05-12-第5章：pwd-显示当前工作目录的路径.md"
            ]
        },
        {
            title: "文档编辑",
            collapsable: false,
            sidebarDepth: 0,
            children: [
                "2022-05-12-第6章：cat-查看文件内容.md",
                "2022-05-12-第7章：echo-输出字符串或提取变量后的值.md"
            ]
        },
        {
            title: "系统管理",
            collapsable: false,
            sidebarDepth: 0,
            children: []
        },
        {
            title: "磁盘管理",
            collapsable: false,
            sidebarDepth: 0,
            children: []
        },
        {
            title: "文件传输",
            collapsable: false,
            sidebarDepth: 0,
            children: []
        },
        {
            title: "网络通讯",
            collapsable: false,
            sidebarDepth: 0,
            children: []
        },
        {
            title: "设备管理",
            collapsable: false,
            sidebarDepth: 0,
            children: []
        },
        {
            title: "备份压缩",
            collapsable: false,
            sidebarDepth: 0,
            children: []
        },
        {
            title: "扩展命令",
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


