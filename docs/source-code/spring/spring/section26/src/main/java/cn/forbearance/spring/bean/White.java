package cn.forbearance.spring.bean;

import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;

/**
 * @author cristina
 */
public class White {

    public White() {
        System.out.println("white...construct...");
    }

    @PostConstruct
    public void init() {
        System.out.println("white...@PostConstruct...");
    }

    @PreDestroy
    public void destroy() {
        System.out.println("white...@PreDestroy...");
    }
}
