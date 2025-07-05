import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";

const Loader = () => {
  const containerRef = useRef(null);
  const txt1Ref = useRef(null);
  const txt2Ref = useRef(null);
  const barRef = useRef(null);

  useLayoutEffect(() => {
    const txt1 = txt1Ref.current;
    const txt2 = txt2Ref.current;
    const bar = barRef.current;
    const container = containerRef.current;

    if (!txt1 || !txt2 || !bar || !container) return;

    // Prepare txt2 for character animation
    const text = txt2.textContent;
    txt2.innerHTML = "";
    const chars = [];
    for (let i = 0; i < text.length; i++) {
      const char = document.createElement("span");
      char.textContent = text[i];
      char.style.display = "inline-block";
      txt2.appendChild(char);
      chars.push(char);
    }

    // Initial states
    gsap.set([txt1, txt2, bar, chars], { clearProps: "all" });
    gsap.set(txt1, { opacity: 1, width: 0, position: "absolute", left: 0, top: 0, color: "#fff", fontWeight: 400 });
    gsap.set(txt2, { opacity: 0, position: "absolute", top: 0, left: 0, color: "#a78bfa", fontWeight: 700 });
    gsap.set(bar, { left: 1, top: -1, width: 3, opacity: 1, backgroundColor: "#fff", position: "absolute" });
    gsap.set(chars, { opacity: 0 });

    // Animation
    const moveBar = () => {
      const w = txt1.offsetWidth;
      gsap.set(bar, { left: w + 1 });
    };

    const tl = gsap.timeline({ delay: 0.2 });
    tl
      .to(bar, { duration: 0.1, opacity: 0, yoyo: true, repeat: 5, repeatDelay: 0.3 }, 0)
      .to(txt1, { duration: 1.1, width: "auto", ease: "steps(14)", onUpdate: moveBar }, 2.5)
      .to(bar, { duration: 0.05, backgroundColor: "#a78bfa" }, "+=0.15")
      .set(txt2, {
        left: () => txt1.offsetWidth + 10,
        opacity: 1,
      })
      .to(chars, { duration: 0.6, opacity: 1, stagger: 0.02, ease: "power3.inOut" }, "+=0.1")
      .to(txt1, { duration: 1.5, opacity: 0.25, ease: "power3.inOut" }, "-=1.2")
      .to(bar, { duration: 0.2, opacity: 0, ease: "power3.inOut" }, "-=1.2")
      .timeScale(1.45);

    return () => tl.kill();
  }, []);

  return (
    <div className="w-full h-screen overflow-hidden relative" style={{ backgroundColor: '#222' }}> {/* LINE 54 - Changed background to darker shade */}
      <div
        ref={containerRef}
        className="absolute top-1/2 left-1/2 w-[600px] h-[40px] transform -translate-x-1/2 -translate-y-1/2 text-[40px] tracking-wide font-sans relative"
      >
        <span ref={txt1Ref} className="inline-block absolute overflow-hidden">www.wryta.com/</span>
        <span ref={txt2Ref} className="inline-block overflow-hidden">Wryta</span>
        <div ref={barRef} className="absolute w-[3px] h-[49px] top-[-1px]" />
      </div>
    </div>
  );
};

export default Loader;