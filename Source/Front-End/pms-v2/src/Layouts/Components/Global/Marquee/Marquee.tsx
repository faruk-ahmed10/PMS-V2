import React, {ReactNode, useEffect} from 'react';
import {css} from "@emotion/css";

const MarqueeNotice = ({content, style, speed}: Partial<{ content: string | ReactNode, speed: number | string | undefined, style: object }>) => {
    const [Speed, setSpeed] = React.useState(speed);
    const __css_Marquee = css(`
    display: block;
    position: relative;
    
    .marquee {
        white-space: nowrap;
        overflow: hidden;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
    }
    
    .marquee span {
        display: inline-block;
        padding-left: 100%;
        will-change: transform;
        animation: marquee ${Speed}s linear infinite;
    }
    
    .marquee span:hover {
        animation-play-state: paused;
        cursor: pointer;
    }
    
    
    @keyframes marquee {
        0% { transform: translate(0, 0); }
        100% { transform: translate(-100%, 0); }
    }
    
    @media (prefers-reduced-motion: reduce) {
        .marquee {
            white-space: normal
        }
        .marquee span {
            animation-iteration-count: 1;
            animation-duration: 0.01s;
            padding-left: 0;
        }
    }
`);

    useEffect(() => {
        if(typeof speed === 'undefined') {
            //Default speed for the marquee
            setSpeed(15);
        }
    });

    return (
        <div className={__css_Marquee} style={style}>
            <div className="marquee">
                <span>
                    {content}
                </span>
            </div>
        </div>
    )
};

export default MarqueeNotice;
