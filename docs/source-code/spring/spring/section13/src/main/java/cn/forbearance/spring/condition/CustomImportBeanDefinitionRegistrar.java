package cn.forbearance.spring.condition;

import cn.forbearance.spring.bean.Background;
import org.springframework.beans.factory.support.BeanDefinitionRegistry;
import org.springframework.beans.factory.support.RootBeanDefinition;
import org.springframework.context.annotation.ImportBeanDefinitionRegistrar;
import org.springframework.core.type.AnnotationMetadata;

/**
 * @author cristina
 */
public class CustomImportBeanDefinitionRegistrar implements ImportBeanDefinitionRegistrar {

    /**
     * 手动注册需要添加到容器中的bean
     * @param importingClassMetadata 当前类的注解信息
     * @param registry BeanDefinition注册类
     */
    @Override
    public void registerBeanDefinitions(AnnotationMetadata importingClassMetadata,
                                        BeanDefinitionRegistry registry) {
        boolean definition1 = registry.containsBeanDefinition("cn.forbearance.spring.bean.Color");
        boolean definition2 = registry.containsBeanDefinition("cn.forbearance.spring.bean.Pink");
        if (definition1 && definition2) {
            // 可以指定bean的定义信息：bean的类型、作用域等等
            // RootBeanDefinition是BeanDefinition接口的一个实现类
            RootBeanDefinition beanDefinition = new RootBeanDefinition(Background.class);
            registry.registerBeanDefinition("background", beanDefinition);
        }
    }
}
