package cn.forbearance.spring.condition;

import org.springframework.beans.factory.config.ConfigurableListableBeanFactory;
import org.springframework.beans.factory.support.BeanDefinitionRegistry;
import org.springframework.context.annotation.Condition;
import org.springframework.context.annotation.ConditionContext;
import org.springframework.core.env.Environment;
import org.springframework.core.type.AnnotatedTypeMetadata;

/**
 * @author cristina
 */
public class LinuxCondition implements Condition {

    /**
     * @param context 上下文(环境)
     * @param metadata 当前标注了@Condition注解的注释信息
     */
    @Override
    public boolean matches(ConditionContext context, AnnotatedTypeMetadata metadata) {
        // 获取bean的创建工厂，创建对象以及装配对象的工厂
        ConfigurableListableBeanFactory beanFactory = context.getBeanFactory();
        // 获取当前环境信息。运行时环境信息、虚拟机变量、环境变量等
        Environment environment = context.getEnvironment();
        // 获取bean定义的注册类
        BeanDefinitionRegistry registry = context.getRegistry();

        // 还可以做更多的判断，容器中是否包含某个bean，如果包含则执行什么样的逻辑
        boolean definition = registry.containsBeanDefinition("org.springframework.context.annotation.internalConfigurationAnnotationProcessor");

        String property = environment.getProperty("os.name");
        if (property.contains("linux")) {
            return true;
        }
        return false;
    }
}
