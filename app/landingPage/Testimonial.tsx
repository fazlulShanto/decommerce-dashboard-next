"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type Testimonial = {
  id: number;
  text: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
};

const testimonials: Testimonial[] = [
  {
    id: 1,
    text: "This platform completely transformed how we manage our e-commerce operations. The analytics insights are game-changing!",
    name: "Sarah Johnson",
    role: "E-Commerce Director",
    company: "Fashion Forward",
    avatar: "/placeholder-user.jpg",
  },
  {
    id: 2,
    text: "The dashboard made our inventory management seamless. We've reduced stockouts by 73% since implementation.",
    name: "Michael Chen",
    role: "Operations Manager",
    company: "TechGadgets Inc",
    avatar: "/placeholder-user.jpg",
  }
];

export const TestimonialSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-radial opacity-50 z-0"></div>
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/20 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/20 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            What Our Customers Say
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Join thousands of satisfied businesses that have transformed their e-commerce operations
          </p>
        </div>

        <div className={cn(
          "flex flex-wrap justify-center gap-8 mb-16",
          testimonials.length >= 3 ? "md:grid md:grid-cols-3" : ""
        )}>
          {testimonials.map((testimonial, index) => (
            <Card 
              key={testimonial.id}
              className={cn(
                "bg-zinc-900/60 backdrop-blur-sm border border-white/10 p-6 rounded-xl transition-all duration-500 hover:border-primary/50 group",
                index === activeIndex ? "scale-105 border-primary/50 shadow-lg shadow-primary/20" : "hover:scale-102",
                testimonials.length < 3 ? "max-w-md" : "w-full"
              )}
            >
              <div className="mb-4">
                <svg width="45" height="36" viewBox="0 0 45 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary opacity-70">
                  <path d="M13.032 35.912C9.144 35.912 6.024 34.696 3.672 32.264C1.32 29.832 0.144 26.568 0.144 22.472C0.144 18.568 1.352 14.984 3.768 11.72C6.184 8.456 9.848 5.48 14.76 2.792L19.224 9.016C14.888 11.32 12.024 13.624 10.632 15.928C9.24 18.232 8.92 20.312 9.672 22.168C10.232 21.608 11.256 21.328 12.744 21.328C14.712 21.328 16.312 22.04 17.544 23.464C18.776 24.888 19.392 26.792 19.392 29.176C19.392 31.72 18.6 33.752 17.016 35.272C15.432 36.696 13.432 37.016 11.016 36.232L13.032 35.912ZM38.328 35.912C34.44 35.912 31.32 34.696 28.968 32.264C26.616 29.832 25.44 26.568 25.44 22.472C25.44 18.568 26.648 14.984 29.064 11.72C31.48 8.456 35.144 5.48 40.056 2.792L44.52 9.016C40.184 11.32 37.32 13.624 35.928 15.928C34.536 18.232 34.216 20.312 34.968 22.168C35.528 21.608 36.552 21.328 38.04 21.328C40.008 21.328 41.608 22.04 42.84 23.464C44.072 24.888 44.688 26.792 44.688 29.176C44.688 31.72 43.896 33.752 42.312 35.272C40.728 36.696 38.728 37.016 36.312 36.232L38.328 35.912Z" fill="currentColor"/>
                </svg>
              </div>
              <p className="mb-6 text-white/90 text-lg leading-relaxed">{testimonial.text}</p>
              <div className="flex items-center">
                <Avatar className="h-12 w-12 border-2 border-primary/40 mr-4">
                  <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                  <AvatarFallback className="bg-primary/20 text-white">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-medium text-white group-hover:text-primary transition-colors">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role}, {testimonial.company}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Navigation dots */}
        <div className="flex justify-center gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={cn(
                "w-3 h-3 rounded-full transition-all",
                index === activeIndex 
                  ? "bg-primary w-10" 
                  : "bg-white/30 hover:bg-white/50"
              )}
              onClick={() => setActiveIndex(index)}
              aria-label={`View testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
