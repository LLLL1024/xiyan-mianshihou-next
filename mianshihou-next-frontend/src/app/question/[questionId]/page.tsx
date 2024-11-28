"use client";
import { message } from "antd";
import { getQuestionVoByIdUsingGet } from "@/api/questionController";
import QuestionCard from "@/components/QuestionCard";
import "./index.css";
import { useEffect, useState } from "react";

/**
 * 题目详情页
 * @constructor
 */
export default function QuestionPage({ params }: any) {
    const { questionId } = params;
    //用于存储获取到的题目详情。
    const [question, setQuestion]: any = useState(null);
    //用于表示数据是否正在加载中。
    const [loading, setLoading] = useState(true);
    //用于存储可能发生的错误信息。
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        getQuestionVoByIdUsingGet({ id: questionId })
            .then((res: any) => {
                setQuestion(res.data);
            })
            .catch((e) => {
                message.error("获取题目详情失败，" + e.message);
                setError("获取题目详情失败，请稍后重试。");
            })
            .finally(() => {
                setLoading(false);
            });
    }, [questionId]); // 注意这里的依赖数组，确保只在 questionId 变化时重新请求

    if (loading) {
        return <div>加载中...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div id="questionPage">
            <QuestionCard question={question} />
        </div>
    );
}


// // "use server";
// "use client";
// import { message } from "antd";
// import { getQuestionVoByIdUsingGet } from "@/api/questionController";
// import QuestionCard from "@/components/QuestionCard";
// import "./index.css";

// /**
//  * 题目详情页
//  * @constructor
//  */
// export default async function QuestionPage({ params }) {
//   const { questionId } = params;

//   // 获取题目详情
//   let question = undefined;
//   try {
//     const res = await getQuestionVoByIdUsingGet({
//       id: questionId,
//     });
//     question = res.data;
//   } catch (e) {
//     message.error("获取题目详情失败，" + e.message);
//   }
//   // 错误处理
//   if (!question) {
//     return <div>获取题目详情失败，请刷新重试</div>;
//   }

//   return (
//     <div id="questionPage">
//       <QuestionCard question={question} />
//     </div>
//   );
// }
