import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Hook for smooth scroll to element by ID
 */
export function useSmoothScroll() {
  const scrollToSection = (sectionId: string, offset = 0) => {
    const element = document.getElementById(sectionId);
    if (!element) return;

    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  };

  return scrollToSection;
}

/**
 * Hook for scroll-triggered animations using Intersection Observer
 * @param options - Intersection Observer options
 */
export function useScrollAnimation(options = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px",
        ...options,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [options]);

  return { ref, isVisible };
}

/**
 * Hook for GSAP ScrollTrigger animations
 */
export function useGSAPScrollTrigger(
  target: string,
  animation: gsap.TweenVars
) {
  useEffect(() => {
    const ctx = gsap.context(() => {});

    const anim = gsap.from(target, {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: "cubic-bezier(0.215, 0.61, 0.355, 1)",
      scrollTrigger: {
        trigger: target,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
      ...animation,
    });

    return () => {
      anim.kill();
      ctx.revert();
    };
  }, [target, animation]);
}

/**
 * Hook for parallax scroll effect
 */
export function useParallax(value: number, distance = 100) {
  return value * distance;
}

/**
 * Hook to track scroll position
 */
export function useScrollPosition() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [scrollDirection, setScrollDirection] = useState("up");

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const updateScrollPosition = () => {
      const currentScrollY = window.scrollY;
      setScrollDirection(currentScrollY > lastScrollY ? "down" : "up");
      setScrollPosition(currentScrollY);
      lastScrollY = currentScrollY;
    };

    const onScroll = () => {
      updateScrollPosition();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    updateScrollPosition();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return { scrollPosition, scrollDirection };
}

/**
 * Hook for magnetic hover effect on elements
 */
 export function useMagneticHover(opts = { strength: 0.3 }) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const deltaX = (x - centerX) * opts.strength;
      const deltaY = (y - centerY) * opts.strength;

      element.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
    };

    const handleMouseLeave = () => {
      element.style.transform = "translate(0, 0)";
    };

    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [opts.strength]);

  return ref;
}

/**
 * Hook for smooth anchor scrolling initialization
 */
export function useAnchorScroll() {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a[href^="#"]');
      if (target) {
        e.preventDefault();
        const targetId = target.getAttribute("href")?.substring(1) || "";
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          const yOffset = -80;
          const y =
            targetElement.getBoundingClientRect().top +
            window.pageYOffset +
            yOffset;
          window.scrollTo({ top: y, behavior: "smooth" });
        }
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);
}

/**
 * Hook for staggered animation of children
 */
export function useStaggerAnimation(
  selector: string,
  staggerDelay = 0.1
) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const elements = ref.current?.querySelectorAll(selector);
    if (!elements) return;

    elements.forEach((el, index) => {
      gsap.from(
        el as Element,
        {
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: "cubic-bezier(0.215, 0.61, 0.355, 1)",
          delay: index * staggerDelay,
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });
  }, [selector, staggerDelay]);

  return ref;
}

/**
 * Hook for custom cursor control
 */
export function useCustomCursor() {
  const setCursorVariant = (variant: string) => {
    if (typeof window !== "undefined" && (window as any).setCursorVariant) {
      (window as any).setCursorVariant(variant);
    }
  };

  return setCursorVariant;
}