"use client"
import { Flex, Menu, Button } from "antd";
import { getQuestionBankVoByIdUsingGet } from "@/api/questionBankController";
import Title from "antd/es/typography/Title";
import { getQuestionVoByIdUsingGet } from "@/api/questionController";
import Sider from "antd/es/layout/Sider";
import { Content } from "antd/es/layout/layout";
import QuestionCard from "@/components/QuestionCard";
import Link from "next/link";
import "./index.css";
import { useEffect, useState } from "react";


/**
 * 题库题目详情页
 * @constructor
 */
export default function BankQuestionPage({ params }: any) {
    const { questionBankId, questionId } = params;

    // 用于存储题库详情
    const [bank, setBank]: any = useState(null);
    // 用于存储题目详情
    const [question, setQuestion]: any = useState(null);
    // 用于表示数据是否正在加载中
    const [loading, setLoading] = useState(true);
    // 用于存储可能发生的错误信息
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);

        // 获取题库详情
        getQuestionBankVoByIdUsingGet({
            id: questionBankId,
            needQueryQuestionList: true,
            pageSize: 200
        })
            .then((res: any) => {
                setBank(res.data);
            })
            .catch((e) => {
                console.error("获取题库列表失败，" + e.message);
                setError("获取题库详情失败，请稍后重试。");
            })
            .finally(() => {
                // 获取题目详情
                getQuestionVoByIdUsingGet({
                    id: questionId
                })
                    .then((res: any) => {
                        setQuestion(res.data);
                    })
                    .catch((e) => {
                        console.error("获取题目详情失败，" + e.message);
                        setError("获取题目详情失败，请稍后重试。");
                    })
                    .finally(() => {
                        setLoading(false);
                    });
            });
    }, [questionBankId, questionId]);

    if (loading) {
        return <div>加载中...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!bank || !question) {
        return <div>获取数据失败，请刷新重试</div>;
    }

    const id = parseInt(question.id, 10);
    const records = bank.questionPage?.records;
    // 题目菜单列表
    const questionMenuItemList = (records || []).map((questionItem: any) => {
        return {
            label: (
                <Link
                    href={`/bank/${questionBankId}/question/${questionItem.id}`}
                    prefetch={false}
                >
                    {questionItem.title}
                </Link>
            ),
            key: questionItem.id
        };
    });

    // PS：以下与教程不同的内容就是添加了跳转上下题，可忽略，只修改上面的就行
    // 题目菜单列表的大小
    const questionListLength = questionMenuItemList.length;

    // 查找当前 question.id 所在的索引位置
    const currentQuestionIndex = records.findIndex(
        (record: any) => record.id === question.id
    );

    // 上下一题的索引
    const preQuestionIndex = currentQuestionIndex - 1;
    const nextQuestionIndex = currentQuestionIndex + 1;

    // 根据索引获取上下一题的id
    const preQuestionId = records[preQuestionIndex]?.id;
    const nextQuestionId = records[nextQuestionIndex]?.id;

    return (
        <div id="bankQuestionPage">
            <Flex gap={24}>
                <Sider width={240} theme="light" style={{ padding: "24px 0" }}>
                    <Title level={4} style={{ padding: "0 20px" }}>
                        {bank.title}
                    </Title>
                    <Menu
                        items={questionMenuItemList}
                        // 选中高亮
                        selectedKeys={[question.id]}
                    />
                </Sider>
                <Content>
                    <QuestionCard question={question} />
                    <div style={{ marginBottom: 16 }} />
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between"
                        }}
                    >
                        {/* 上一题按钮 */}
                        <Button
                            type="primary"
                            href={`/bank/${questionBankId}/question/${preQuestionId}`}
                            disabled={currentQuestionIndex === 0}
                            style={{
                                fontSize: "18px",
                                padding: "18px 20px"
                            }}
                        >
                            上一题
                        </Button>
                        {/* 下一题按钮 */}
                        <Button
                            type="primary"
                            href={`/bank/${questionBankId}/question/${nextQuestionId}`}
                            disabled={
                                currentQuestionIndex === questionListLength - 1
                            }
                            style={{
                                fontSize: "18px",
                                padding: "18px 20px"
                            }}
                        >
                            下一题
                        </Button>
                    </div>
                </Content>
            </Flex>
        </div>
    );
}



// // "use server";
// "use client"
// import { Flex, Menu, message } from "antd";
// import { getQuestionBankVoByIdUsingGet } from "@/api/questionBankController";
// import Title from "antd/es/typography/Title";
// import { getQuestionVoByIdUsingGet } from "@/api/questionController";
// import Sider from "antd/es/layout/Sider";
// import { Content } from "antd/es/layout/layout";
// import QuestionCard from "@/components/QuestionCard";
// import Link from "next/link";
// import "./index.css";

// /**
//  * 题库题目详情页
//  * @constructor
//  */
// export default async function BankQuestionPage({ params }) {
//   const { questionBankId, questionId } = params;

//   // 获取题库详情
//   let bank = undefined;
//   try {
//     const res = await getQuestionBankVoByIdUsingGet({
//       id: questionBankId,
//       needQueryQuestionList: true,
//       // 可以自行扩展为分页实现
//       pageSize: 200,
//     });
//     bank = res.data;
//   } catch (e) {
//     console.error("获取题库详情失败，" + e.message);
//   }
//   // 错误处理
//   if (!bank) {
//     return <div>获取题库详情失败，请刷新重试</div>;
//   }

//   // 获取题目详情
//   let question = undefined;
//   try {
//     const res = await getQuestionVoByIdUsingGet({
//       id: questionId,
//     });
//     question = res.data;
//   } catch (e) {
//     console.error("获取题库详情失败，" + e.message);
//   }
//   // 错误处理
//   if (!question) {
//     return <div>获取题目详情失败，请刷新重试</div>;
//   }

//   // 题目菜单列表
//   const questionMenuItemList = (bank.questionPage?.records || []).map((q) => {
//     return {
//       label: (
//         <Link href={`/bank/${questionBankId}/question/${q.id}`}>{q.title}</Link>
//       ),
//       key: q.id,
//     };
//   });

//   return (
//     <div id="bankQuestionPage">
//       <Flex gap={24}>
//         <Sider width={240} theme="light" style={{ padding: "24px 0" }}>
//           <Title level={4} style={{ padding: "0 20px" }}>
//             {bank.title}
//           </Title>
//           <Menu items={questionMenuItemList} selectedKeys={[question.id]} />
//         </Sider>
//         <Content>
//           <QuestionCard question={question} />
//         </Content>
//       </Flex>
//     </div>
//   );
// }
