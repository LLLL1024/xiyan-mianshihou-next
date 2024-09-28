"use client";
import { Card } from "antd";
import Title from "antd/es/typography/Title";
import TagList from "@/components/TagList";
import MdViewer from "@/components/MdViewer";
import "./index.css";
import useAddUserSignInRecord from "@/hooks/useAddUserSignInRecord";

interface Props {
  question: API.QuestionVO;
}

/**
 * 题目卡片
 * @param props
 * @constructor
 */
const QuestionCard = (props: Props) => {
  const { question } = props;

  // 签到
  useAddUserSignInRecord();

  // SEO搜索引擎优化，百度爬虫特别喜欢一级标题，一级标题代表整个页面的唯一标识、唯一的核心内容，所以题目、题库详情页都可以用一级标题，这样就可能会增加搜索的次数
  return (
    <div className="question-card">
      <Card>
        <Title level={1} style={{ fontSize: 24 }}>
          {question.title}
        </Title>
        <TagList tagList={question.tagList} />
        <div style={{ marginBottom: 16 }} />
        <MdViewer value={question.content} />
      </Card>
      <div style={{ marginBottom: 16 }} />
      <Card title="推荐答案">
        <MdViewer value={question.answer} />
      </Card>
    </div>
  );
};

export default QuestionCard;
