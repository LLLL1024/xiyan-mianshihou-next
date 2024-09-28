package com.xiyan.mianshihou.esdao;

import com.xiyan.mianshihou.model.dto.post.PostEsDTO;
import com.xiyan.mianshihou.model.dto.question.QuestionEsDTO;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

import java.util.List;

/**
 * 题目 ES 操作
 */
public interface QuestionEsDao extends ElasticsearchRepository<QuestionEsDTO, Long> {

    List<QuestionEsDTO> findByUserId(Long userId);
}