package cn.forbearance.spring.service;

import cn.forbearance.spring.mapper.BookMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

/**
 * @author cristina
 */
@Service
public class BookService {

//    @Qualifier("bookMapper")
    @Autowired
    private BookMapper bookMapper;

    @Override
    public String toString() {
        return "BookService{" +
                "bookMapper=" + bookMapper +
                '}';
    }
}
