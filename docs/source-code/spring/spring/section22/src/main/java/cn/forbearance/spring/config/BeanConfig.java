package cn.forbearance.spring.config;

import cn.forbearance.spring.bean.CustomAware;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;


/**
 * @author cristina
 */
@Configuration
public class BeanConfig {

    @Bean
    public CustomAware customAware() {
        return new CustomAware();
    }

}
