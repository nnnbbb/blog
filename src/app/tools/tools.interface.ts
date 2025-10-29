import { TabType } from "@/components/Function-Tabls/function-tabs.interface"
export const toolsTabs: TabType[] = [
  {
    label: 'Text',
    tabChildren: [
      {
        href: '/tools/zhihu-answer-crawler',
        toolName: '知乎回答爬虫',
        description: '爬取知乎回答，转换为markdown格式保存到数据库中',
      }
    ],
  },
  {
    label: 'Vision',
    tabChildren: [],
  },

  {
    label: 'Audio',
    tabChildren: [],
  },
]
