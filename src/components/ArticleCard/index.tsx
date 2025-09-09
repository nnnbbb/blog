import React, { useState } from 'react';

interface ArticleCardProps {
  title: string;
  content: string;
  date?: string;
  tags?: string[];
  imageUrl?: string;
}

const ArticleCard: React.FC<ArticleCardProps> = ({
  title,
  content,
  date = "未知日期",
  tags = [],
  imageUrl
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="hover-effect-shadow-border p-5 mb-5 gap-5 hover:border-[rgba(128,30,255,1)]"
      style={{
        display: 'flex',
        justifyContent: 'space-evenly',
        borderBottom: isHovered ? '1px solid rgba(128,30,255,1)' : '1px solid rgba(86, 86, 86, 0.2)',
        marginTop: '32px',
        paddingTop: '10px',
        paddingBottom: '25px',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={{ flex: '1', verticalAlign: 'baseline' }}>
        <h2 style={{ fontSize: '25px', marginBottom: '5px' }}>
          <span className="iconfont icon-blog" style={{ fontSize: '24px', marginRight: '10px', color: 'rgba(128, 30, 255, 1)' }}></span>
          <span style={{ margin: '0', fontSize: '25px', fontWeight: 'bold' }}>{title}</span>
        </h2>
        <p style={{ margin: '10px 0', fontSize: '0.9rem' }}>
          {content}
        </p>
        {(date || tags.length > 0) && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: '30px',
            fontSize: '15px',
            color: 'var(--sidebar-color)',
          }}>
            {date && <span style={{ display: 'flex', alignItems: 'center', fontSize: '13px', marginRight: '10px' }}>{date}</span>}
            {tags.length > 0 && (
              <div className="tags-container" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <span className='iconfont icon-tag' style={{ fontSize: '15px', marginRight: '5px' }}></span>
                {tags.map((tag, index) => (
                  <span key={index} className='bg-white/30 ' style={{ padding: '2px 8px', borderRadius: '3px' }}>{tag}</span>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <div className="image-container">
        <div className="image" style={{ width: '200px', height: '120px' }}>
          <div className="loading-image-container">
            <div className="image-container display-image-wrapper">
              <img src={imageUrl} className="paper-left-image" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
