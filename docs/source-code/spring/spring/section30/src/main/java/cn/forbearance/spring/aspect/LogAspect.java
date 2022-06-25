package cn.forbearance.spring.aspect;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

/**
 * @author cristina
 */
@Aspect
public class LogAspect {

    @Pointcut
    public void pointCut() {}

    @Before("pointCut()")
    public void saveLog(JoinPoint joinPoint) {
        AnnotationConfigApplicationContext annotationConfigApplicationContext = new AnnotationConfigApplicationContext();
        annotationConfigApplicationContext.getBean("");
        System.out.println("...");
    }


}
