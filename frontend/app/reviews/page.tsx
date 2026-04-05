"use client";

import { motion } from "framer-motion";
import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import { Button } from "@/components/ui/button";

type ReviewFormData = {
  name: string;
  profession: string;
  place: string;
  review: string;
};

export default function ReviewsPage() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ReviewFormData>();

  const reviewText = watch("review") || "";

  const onSubmit: SubmitHandler<ReviewFormData> = async (formData) => {
    try {
      await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      setSubmitted(true);
      reset();

      setTimeout(() => setSubmitted(false), 3000);
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  return (
    <div className="relative min-h-screen bg-[hsl(240,40%,3%)] text-white px-6 py-24 overflow-hidden">

      {/* 🌌 BACKGROUND GLOW */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[10%] left-[15%] w-[400px] h-[400px] bg-[hsl(185,100%,50%,0.15)] blur-[140px] rounded-full" />
        <div className="absolute bottom-[10%] right-[15%] w-[400px] h-[400px] bg-[hsl(290,70%,50%,0.15)] blur-[140px] rounded-full" />
      </div>

      {/* HEADER */}
      <div className="relative z-10 max-w-4xl mx-auto text-center mb-20">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-orbitron text-[clamp(3rem,7vw,5rem)] font-black mb-4"
        >
          COMMUNITY{" "}
          <span className="text-[hsl(185,100%,50%)] drop-shadow-[0_0_40px_hsl(185,100%,50%)]">
            REVIEWS
          </span>
        </motion.h1>

        <p className="text-muted-foreground max-w-xl mx-auto">
          Your voice powers VeriFace. Share your experience and help shape the future of AI trust.
        </p>
      </div>

      {/* FORM */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 max-w-3xl mx-auto p-10 rounded-3xl border border-[hsl(185,100%,50%,0.15)] bg-[hsl(240,30%,5%,0.65)] backdrop-blur-xl overflow-hidden"
      >
        {/* glow border */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-[hsl(185,100%,50%,0.15)] to-[hsl(290,70%,50%,0.15)] blur-xl opacity-50" />

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 relative z-10">

          {/* Name */}
          <div>
            <label className="text-xs uppercase mb-2 block text-muted-foreground">
              Name
            </label>
            <input
              {...register("name", { required: "Required" })}
              className="w-full px-4 py-3 rounded-xl bg-[hsl(0,0%,100%,0.04)] border border-[hsl(0,0%,100%,0.08)] focus:border-[hsl(185,100%,50%)] focus:shadow-[0_0_0_2px_hsl(185,100%,50%,0.2)] transition-all outline-none"
              placeholder="Your name"
            />
            {errors.name && <p className="text-red-400 text-xs mt-1">Required</p>}
          </div>

          {/* Row */}
          <div className="grid md:grid-cols-2 gap-4">
            <input
              {...register("profession", { required: true })}
              placeholder="Profession"
              className="px-4 py-3 rounded-xl bg-[hsl(0,0%,100%,0.04)] border border-[hsl(0,0%,100%,0.08)] focus:border-[hsl(185,100%,50%)] outline-none"
            />
            <input
              {...register("place", { required: true })}
              placeholder="Location"
              className="px-4 py-3 rounded-xl bg-[hsl(0,0%,100%,0.04)] border border-[hsl(0,0%,100%,0.08)] focus:border-[hsl(185,100%,50%)] outline-none"
            />
          </div>

          {/* Review */}
          <div>
            <textarea
              {...register("review", { required: true, minLength: 20 })}
              rows={5}
              placeholder="Write your experience..."
              className="w-full px-4 py-3 rounded-xl bg-[hsl(0,0%,100%,0.04)] border border-[hsl(0,0%,100%,0.08)] focus:border-[hsl(185,100%,50%)] outline-none resize-none"
            />

            {/* Character Counter */}
            <div className="text-right text-xs text-muted-foreground mt-1">
              {reviewText.length} / 300
            </div>
          </div>

          {/* CTA */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 text-black font-semibold bg-[linear-gradient(90deg,hsl(185,100%,50%),hsl(210,100%,60%))] hover:scale-[1.03] transition-all shadow-[0_0_40px_hsl(185,100%,50%,0.4)]"
          >
            {isSubmitting ? "Submitting..." : "Submit Review →"}
          </Button>

          {/* SUCCESS STATE */}
          {submitted && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-green-400 text-sm"
            >
              ✅ Review submitted successfully!
            </motion.div>
          )}
        </form>
      </motion.div>

      {/* REVIEWS GRID */}
      <div className="relative z-10 max-w-6xl mx-auto mt-24 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="group p-6 rounded-2xl border border-[hsl(0,0%,100%,0.06)] bg-[hsl(240,30%,5%,0.6)] backdrop-blur-xl hover:border-[hsl(185,100%,50%,0.4)] hover:shadow-[0_0_60px_hsl(185,100%,50%,0.15)] transition-all"
          >
            <p className="text-sm text-muted-foreground mb-4">
              “This platform is insanely accurate. Helped me detect fake AI images instantly.”
            </p>

            <div className="text-xs text-[hsl(185,100%,50%)] font-semibold">
              John Doe
            </div>
            <div className="text-[0.65rem] text-muted-foreground">
              Data Analyst · USA
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}