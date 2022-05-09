package cn.forbearance.spring.config;

import cn.forbearance.spring.bean.*;
import cn.forbearance.spring.condition.CustomImportBeanDefinitionRegistrar;
import cn.forbearance.spring.condition.CustomImportSelector;
import cn.forbearance.spring.condition.LinuxCondition;
import cn.forbearance.spring.condition.WindowsCondition;
import org.springframework.context.annotation.*;

/**
 * @author cristina
 */
@ComponentScan("cn.forbearance.spring")
@Configuration
@Import({Color.class, CustomImportSelector.class, CustomImportBeanDefinitionRegistrar.class})
public class BeanConfig {

    @Scope(value = "prototype")
    @Bean(initMethod = "init", destroyMethod = "destroy")
    public Book book() {
        System.out.println("向Spring容器中注册组件");
        return new Book("forbearance.cn", 49);
    }

    @Conditional(WindowsCondition.class)
    @Bean(value = "windows")
    public Book book1() {
        return new Book("book1", 49);
    }

    @Conditional(LinuxCondition.class)
    @Bean(value = "linux")
    public Book book2() {
        return new Book("book2", 49);
    }

    @Bean
    public CustomFactoryBean customFactoryBean() {
        return new CustomFactoryBean();
    }

    @Bean
    @Scope("prototype")
    public Blue blue() {
        return new Blue();
    }

    @Bean
    public White white() {
        return new White();
    }

}
