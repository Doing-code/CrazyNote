package cn.forbearance.spring.service;

import cn.forbearance.spring.mapper.BookMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import javax.inject.Inject;

/**
 * @author cristina
 */
@Service
public class BookService {

//    @Resource
    @Inject
    private BookMapper bookMapper;

    @Override
    public String toString() {
        return "BookService{" +
                "bookMapper=" + bookMapper +
                '}';
    }
}
