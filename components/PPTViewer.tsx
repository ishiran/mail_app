import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, X, Play, Maximize2, Check } from 'lucide-react';

interface PPTViewerProps {
  onClose: () => void;
}

const slides = [
  // Slide 1
  {
    type: 'cover',
    title: '一份迟到的答卷',
    subtitle: '对“读者借阅率”的思考'
  },
  // Slide 2
  {
    type: 'simple-text',
    text: '你可能不知道，我一直记得你曾经问我的那个问题。'
  },
  // Slide 3
  {
    type: 'text-left',
    content: '去年面试时，你问我的第一个问题是：“你怎么看待如今借阅率低的问题？” 当时的我回答得不好。所以入职以来我时常在思考这个问题——带着一点不甘心，也带着一点想找到答案的心情。'
  },
  // Slide 4
  {
    type: 'section-header',
    title: 'Part 1：读者的视角',
    subtitle: '下班后，我以读者的身份重新回到图书馆。'
  },
  // Slide 5 - The Grid
  {
    type: 'grid-4',
    title: '读者的日常路径与痛点',
    items: [
      {
        title: '① 在官网找书（没找到）',
        desc: '想借的书没有采购，从荐购到上架至少要两年时间。',
        img: 'https://ishiran.github.io/images/pain_search.png'
      },
      {
        title: '② 充电与学习两难全',
        desc: '集中接线板让人必须坐在插座附近，不方便学生听网课。',
        img: 'https://ishiran.github.io/images/pain_power.jpg'
      },
      {
        title: '③ 碰到旧书、脏书',
        desc: '布满灰尘会直接劝退，紫外线设备形同虚设。',
        img: 'https://ishiran.github.io/images/pain_dust.jpg'
      },
      {
        title: '④ 借书流程复杂',
        desc: '需要输入账号和密码，让借书变得不再轻松。',
        img: 'https://ishiran.github.io/images/pain_process.jpg'
      }
    ]
  },
  // Slide 6
  {
     type: 'big-statement',
     text: '我突然明白了——借阅率低，不只是读者的问题，也是图书馆自己的问题。'
  },
  // Slide 7
  {
    type: 'text-content',
    title: '正在悄悄发生的改变',
    content: (
      <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
        <p>但这几天在图书馆走来走去的时候，我也忽然意识到一件事：并不是所有地方都停滞不前。 门口的雨伞架、三楼的存书架、一些流程的优化、甚至 AI 馆员…… </p>
        <p className="font-medium text-gray-900">那些或许都是你在任期间推动的。</p>
        <p>高校馆没有那么多经费和资源，但在有限条件里，你还是把一些具体的事情慢慢做出来了。</p>
        <p>我以前总觉得图书馆的问题太多、解决不了。但现在我开始理解：很多改变不是轰轰烈烈的，是一点点悄悄发生的。</p>
        <p className="text-blue-700 font-medium pt-4">我也想成为这样的人——能在现实的框架里，仍然把一些事情往前推一格。</p>
      </div>
    )
  },
  // Slide 8
  {
    type: 'text-split',
    content: '也正因为看见了这些具体的改变，我才更加意识到， 图书馆需要的不只是环境的优化，而是从读者、服务到内容的整体优化。 所以我开始重新回到那个问题：',
    highlight: '如果是我，要如何回应读者的真实需求？'
  },
  // Slide 9
  {
    type: 'section-header',
    title: 'Part 2：反思',
    subtitle: '—— 兼顾学生的需求'
  },
  // Slide 10
  {
    type: 'columns-2',
    leftTitle: '需求错位：专业 vs. 生活',
    leftText: '在专业书之外，我们也需要兼顾更贴近大学生日常的生活类图书。 学生的需求往往藏在具体情景问题里，生活类、治愈系和实用技能的书籍能为他们提供生活上的支持。',
    rightTitle: '推广失效：看不见的书单',
    rightText: (
      <>
        <p className="mb-4">图书馆的展览架被导引牌挡住，且不在学生入馆动线上。</p>
        <p className="mb-6">公众号荐书只是按照学科分类，没有贴合热点，对学生吸引力不够。</p>
        <div className="bg-orange-50 p-4 rounded-lg border border-orange-100">
          <strong className="text-orange-800 block mb-2">热点示例：</strong>
          <span className="text-gray-700">开学季（求医、收纳）、毕业季（租房、面试）。</span>
        </div>
      </>
    )
  },
  // Slide 11
  {
    type: 'quote',
    title: 'Part 3：我的思考',
    text: '“我想，你问我的那个问题，其实是在问：你想把图书馆变成什么样？”'
  },
  // Slide 12
  {
    type: 'checklist',
    title: '我思考的方向',
    items: [
      { text: '采访与阅读推广互相支撑', sub: '在采购时就有意识地去思考这些书能不能在未来做主题书展。' },
      { text: '在日常生活中关注热点、关注人', sub: '迅速捕捉读者的即时信息需求，让阅读和他们的生活发生连接。' },
      { text: '改善书籍卫生状况', sub: '将紫外线除菌设备投入使用，让读者愿意触碰旧书。' },
      { text: '优化学习环境', sub: '改善座位、照明、充电方式，让图书馆成为舒适的学习空间。' },
    ],
    footer: '这些事情我现在还没做到太多。但我会继续思考、继续尝试，一点点前进。'
  },
  // Slide 13
  {
    type: 'big-statement',
    title: '结语',
    text: '“借阅率低只是一个结果，不是问题本身。真正的挑战是：在历史的沉淀里，找到属于新时代读者的‘角度’。”'
  },
  // Slide 14
  {
    type: 'simple-text',
    text: '所以关于你问我的那个问题，我想基于我目前的认知重新给你一个回答。'
  },
  // Slide 15
  {
    type: 'big-statement-sub',
    text: '我对你说： 借阅率的提高不是单点突破，而应该是空间、馆藏和推广三者之间的联动。',
    subtext: '而我还在这里，会把这句话一点点变成现实的。 这就是我的答案。而寻找答案的旅程，其实是从你那句提问悄悄开始的。'
  },
  // Slide 16
  {
    type: 'cover',
    title: '谢谢您',
    subtitle: '感谢您那时的提问，也感谢您一直以来的指引。\n祝您的下一章，自由而精彩。'
  }
];

export const PPTViewer: React.FC<PPTViewerProps> = ({ onClose }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) setCurrentSlide(c => c + 1);
  };

  const prevSlide = () => {
    if (currentSlide > 0) setCurrentSlide(c => c - 1);
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide]);

  const renderContent = (data: any) => {
    switch (data.type) {
      case 'cover':
        return (
          <div className="flex flex-col items-center justify-center h-full text-center space-y-8 animate-fadeIn">
            <h1 className="text-6xl font-bold text-gray-900 tracking-tight leading-tight">{data.title}</h1>
            <div className="w-24 h-1 bg-blue-600 rounded-full"></div>
            <h2 className="text-3xl text-gray-500 font-light whitespace-pre-line leading-relaxed">{data.subtitle}</h2>
          </div>
        );

      case 'simple-text':
        return (
          <div className="flex items-center justify-center h-full px-16">
            <h2 className="text-4xl font-medium text-gray-800 leading-normal text-center">{data.text}</h2>
          </div>
        );

      case 'text-left':
        return (
          <div className="flex items-center justify-center h-full px-20">
            <p className="text-3xl font-light text-gray-800 leading-loose text-left">{data.content}</p>
          </div>
        );

      case 'section-header':
        return (
          <div className="flex flex-col justify-center h-full px-20">
            <h2 className="text-6xl font-bold text-blue-900 mb-6">{data.title}</h2>
            <h3 className="text-3xl text-gray-500 font-light">{data.subtitle}</h3>
          </div>
        );

      case 'grid-4':
        return (
          <div className="flex flex-col h-full pt-8 px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">{data.title}</h2>
            <div className="flex-1 grid grid-cols-2 grid-rows-2 gap-6">
              {data.items.map((item: any, idx: number) => (
                <div key={idx} className="flex bg-gray-50 rounded-xl overflow-hidden border border-gray-100 shadow-sm">
                   <div className="w-1/2 relative bg-gray-200">
                     <img src={item.img} className="absolute inset-0 w-full h-full object-cover" alt="" />
                   </div>
                   <div className="w-1/2 p-4 flex flex-col justify-center">
                     <h4 className="font-bold text-gray-900 mb-2">{item.title}</h4>
                     <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                   </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'big-statement':
        return (
          <div className="flex flex-col justify-center h-full px-20 text-center">
             <div className="text-lg text-gray-400 font-bold uppercase tracking-widest mb-8">{data.title}</div>
             <h2 className="text-4xl font-bold text-gray-900 leading-relaxed">
               {data.text}
             </h2>
          </div>
        );

      case 'text-content':
        return (
          <div className="flex flex-col pt-12 px-16 h-full">
            <h2 className="text-4xl font-bold text-gray-900 mb-12">{data.title}</h2>
            <div className="flex-1">
              {data.content}
            </div>
          </div>
        );

      case 'text-split':
        return (
          <div className="flex flex-col justify-center h-full px-20 space-y-12">
            <p className="text-2xl text-gray-600 leading-loose">{data.content}</p>
            <p className="text-3xl font-bold text-blue-900">{data.highlight}</p>
          </div>
        );

      case 'columns-2':
        return (
          <div className="flex h-full pt-16 px-16 gap-16">
            <div className="w-1/2 flex flex-col">
               <h3 className="text-2xl font-bold text-gray-900 mb-6">{data.leftTitle}</h3>
               <p className="text-lg text-gray-700 leading-relaxed">{data.leftText}</p>
            </div>
            <div className="w-px bg-gray-200 h-2/3 self-center"></div>
            <div className="w-1/2 flex flex-col">
               <h3 className="text-2xl font-bold text-gray-900 mb-6">{data.rightTitle}</h3>
               <div className="text-lg text-gray-700 leading-relaxed">{data.rightText}</div>
            </div>
          </div>
        );
      
      case 'quote':
        return (
          <div className="flex flex-col justify-center h-full px-20">
             <div className="text-xl text-blue-600 font-bold mb-8">{data.title}</div>
             <p className="text-5xl font-serif italic text-gray-800 leading-snug">{data.text}</p>
          </div>
        );

      case 'checklist':
        return (
          <div className="flex flex-col pt-12 px-16 h-full">
             <h2 className="text-4xl font-bold text-gray-900 mb-10">{data.title}</h2>
             <div className="space-y-6">
                {data.items.map((item: any, idx: number) => (
                  <div key={idx} className="flex items-start">
                    <div className="mt-1 w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white mr-4 flex-shrink-0">
                      <Check size={14} strokeWidth={3} />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-gray-800">{item.text}</h4>
                      <p className="text-base text-gray-600 mt-1">{item.sub}</p>
                    </div>
                  </div>
                ))}
             </div>
             <div className="mt-auto mb-12 pt-6 border-t border-gray-200 text-gray-500 italic">
               {data.footer}
             </div>
          </div>
        );

      case 'big-statement-sub':
        return (
          <div className="flex flex-col justify-center h-full px-20">
            <h2 className="text-4xl font-bold text-gray-900 leading-relaxed mb-8">{data.text}</h2>
            <p className="text-xl text-gray-600 leading-loose">{data.subtext}</p>
          </div>
        );

      default: 
        return <div>Unknown Slide Type</div>;
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="relative w-full h-full md:w-[90vw] md:h-[85vh] md:max-w-6xl md:max-h-[900px] bg-white md:rounded-xl shadow-2xl overflow-hidden flex flex-col animate-popIn">
        
        {/* Toolbar */}
        <div className="h-12 bg-[#f3f3f3] border-b border-[#d1d1d1] flex items-center justify-between px-4 flex-shrink-0 select-none">
          <div className="flex items-center space-x-4">
            <div className="flex space-x-2 mr-2 group">
              {/* Close Button - Functions as Window Close */}
              <div 
                onClick={(e) => {
                  e.stopPropagation();
                  onClose();
                }}
                className="w-3 h-3 rounded-full bg-[#ff5f57] hover:bg-[#ff5f57]/80 border border-[#e0443e] flex items-center justify-center cursor-pointer shadow-sm"
              >
                 <X size={8} className="text-black/50 opacity-0 group-hover:opacity-100" />
              </div>
              <div className="w-3 h-3 rounded-full bg-[#febc2e] border border-[#d89e24] cursor-default"></div>
              <div className="w-3 h-3 rounded-full bg-[#28c840] border border-[#1aab29] cursor-default"></div>
            </div>
            
            <div className="h-6 w-px bg-gray-300 mx-2"></div>
            
            <div className="flex items-center space-x-2">
               <div className="bg-white border border-gray-300 rounded px-2 py-0.5 text-xs font-medium text-gray-700 shadow-sm flex items-center">
                 <span className="w-2 h-2 rounded-full bg-blue-500 mr-2"></span>
                 Keynote
               </div>
            </div>
          </div>

          <div className="font-semibold text-sm text-gray-700">对“读者借阅率”的思考.ppt</div>
          
          <div className="flex items-center space-x-3 w-20 justify-end">
             <button className="p-1 hover:bg-gray-200 rounded text-gray-500 transition-colors">
               <Play size={16} className="fill-current" />
             </button>
          </div>
        </div>

        {/* Slide Canvas */}
        <div className="flex-1 relative bg-white overflow-hidden p-0 flex flex-col">
          <div className="flex-1 overflow-hidden">
             {renderContent(slides[currentSlide])}
          </div>
          
          {/* Slide Number */}
          <div className="absolute bottom-4 right-6 text-gray-300 text-sm font-medium font-mono select-none bg-white/80 px-2 rounded">
             {currentSlide + 1} / {slides.length}
          </div>
        </div>

        {/* Navigation Controls Overlay */}
        <div className="absolute inset-y-12 left-0 w-24 flex items-center justify-start pl-4 opacity-0 hover:opacity-100 transition-opacity duration-300 z-10">
            <button 
            onClick={(e) => { e.stopPropagation(); prevSlide(); }}
            disabled={currentSlide === 0}
            className="p-3 rounded-full bg-black/10 hover:bg-black/20 backdrop-blur-sm text-gray-500 hover:text-gray-800 disabled:invisible transition-all transform hover:scale-110"
            >
            <ChevronLeft size={32} />
            </button>
        </div>

        <div className="absolute inset-y-12 right-0 w-24 flex items-center justify-end pr-4 opacity-0 hover:opacity-100 transition-opacity duration-300 z-10">
            <button 
            onClick={(e) => { e.stopPropagation(); nextSlide(); }}
            disabled={currentSlide === slides.length - 1}
            className="p-3 rounded-full bg-black/10 hover:bg-black/20 backdrop-blur-sm text-gray-500 hover:text-gray-800 disabled:invisible transition-all transform hover:scale-110"
            >
            <ChevronRight size={32} />
            </button>
        </div>
      </div>
    </div>
  );
};