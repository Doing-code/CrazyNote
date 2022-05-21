package cn.forbearance.spring.aspect;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;

/**
 * @author cristina
 */
@Aspect
public class LogAspect {

    @Pointcut
    public void pointCut() {}

    @Before("pointCut()")
    public void saveLog(JoinPoint joinPoint) {
        System.out.println("...");
    }


}
