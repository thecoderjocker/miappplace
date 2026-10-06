import React from 'react';

interface BoutiqueCardSkeletonProps {
  theme?: 'dark' | 'light';
}

export const BoutiqueCardSkeleton: React.FC<BoutiqueCardSkeletonProps> = ({ theme = 'dark' }) => {
  const isLight = theme === 'light';
  const shimmerClass = isLight
    ? 'heroui-skeleton heroui-skeleton-light bg-zinc-200/80'
    : 'heroui-skeleton heroui-skeleton-dark bg-[#27272a]';

  if (isLight) {
    return (
      <div className="flex flex-col bg-white border border-zinc-200/90 shadow-md p-3.5 rounded-3xl h-full animate-in fade-in duration-300">
        {/* Image Area Skeleton */}
        <div className={`relative w-full aspect-square rounded-2xl ${shimmerClass} shrink-0`}>
          {/* Top-left status badge skeleton */}
          <div className="absolute top-2.5 left-2.5 w-20 h-6 rounded-full bg-white/70 shadow-sm" />
          {/* Top-right bookmark button skeleton */}
          <div className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/70 shadow-sm" />
        </div>

        {/* Title & Verified Pill */}
        <div className="flex flex-col pt-3 pb-1">
          <div className="flex items-center justify-between gap-1.5">
            <div className={`h-5 w-3/5 rounded-lg ${shimmerClass}`} />
            <div className={`h-5 w-20 rounded-full ${shimmerClass} shrink-0`} />
          </div>

          <div className="mt-1.5 space-y-1">
            <div className={`h-3.5 w-28 rounded-md ${shimmerClass}`} />
            <div className={`h-3 w-16 rounded-md ${shimmerClass}`} />
          </div>
        </div>

        {/* Rating Bar Skeleton */}
        <div className={`my-2 h-7 w-full rounded-xl ${shimmerClass}`} />

        {/* Operator Row Skeleton */}
        <div className="flex items-center justify-between py-2 border-b border-zinc-100 mb-2.5">
          <div className="flex items-center gap-2.5">
            <div className={`w-8 h-8 rounded-full ${shimmerClass} shrink-0`} />
            <div className="space-y-1">
              <div className={`h-3.5 w-24 rounded-md ${shimmerClass}`} />
              <div className={`h-2.5 w-16 rounded-md ${shimmerClass}`} />
            </div>
          </div>
          <div className={`w-8 h-8 rounded-xl ${shimmerClass} shrink-0`} />
        </div>

        {/* Metadata 2x2 Grid Skeleton */}
        <div className="grid grid-cols-2 gap-y-2 gap-x-2 mb-3.5">
          <div className={`h-3.5 w-full rounded-md ${shimmerClass}`} />
          <div className={`h-3.5 w-full rounded-md ${shimmerClass}`} />
          <div className={`h-3.5 w-full rounded-md ${shimmerClass}`} />
          <div className={`h-3.5 w-full rounded-md ${shimmerClass}`} />
        </div>

        {/* Action Button Skeleton */}
        <div className={`w-full h-10 rounded-xl ${shimmerClass} mt-auto`} />
      </div>
    );
  }

  // Dark Theme Skeleton
  return (
    <div className="flex flex-col bg-[#18181b]/95 border border-white/10 p-3 sm:p-3.5 rounded-2xl h-full animate-in fade-in duration-300">
      {/* Image Area Skeleton */}
      <div className={`relative w-full aspect-square rounded-xl ${shimmerClass} shrink-0`}>
        {/* Top-left status badge */}
        <div className="absolute top-2 left-2 w-16 h-5 rounded-full bg-black/40 border border-white/10" />
        {/* Top-right bookmark button */}
        <div className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/40 border border-white/10" />
      </div>

      {/* Main Info */}
      <div className="flex flex-col pt-2 pb-1 space-y-1.5">
        <div className="flex items-center justify-between gap-1">
          <div className={`h-5 w-3/5 rounded-lg ${shimmerClass}`} />
          <div className={`h-5 w-24 rounded-full ${shimmerClass} shrink-0`} />
        </div>

        <div className="flex items-center justify-between gap-2 my-1">
          <div className={`h-3.5 w-32 rounded-md ${shimmerClass}`} />
          <div className={`h-3.5 w-16 rounded-md ${shimmerClass} shrink-0`} />
        </div>
      </div>

      {/* Operator Row Skeleton */}
      <div className="flex items-center justify-between py-1 border-b border-white/5 mb-1.5">
        <div className="flex items-center gap-2">
          <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full ${shimmerClass} shrink-0`} />
          <div className="space-y-1">
            <div className={`h-3.5 w-24 rounded-md ${shimmerClass}`} />
            <div className={`h-2.5 w-16 rounded-md ${shimmerClass}`} />
          </div>
        </div>
        <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg ${shimmerClass} shrink-0`} />
      </div>

      {/* Schedule Box Skeleton */}
      <div className="mb-2 p-2 rounded-xl bg-[#2a2a2c]/60 border border-white/5 space-y-2">
        <div className="flex items-center justify-between pb-1 border-b border-white/5">
          <div className={`h-3 w-24 rounded-md ${shimmerClass}`} />
          <div className={`h-3 w-12 rounded-md ${shimmerClass}`} />
        </div>
        <div className="space-y-1.5 pt-0.5">
          <div className="flex justify-between items-center">
            <div className={`h-2.5 w-14 rounded ${shimmerClass}`} />
            <div className={`h-2.5 w-20 rounded ${shimmerClass}`} />
          </div>
          <div className="flex justify-between items-center">
            <div className={`h-2.5 w-14 rounded ${shimmerClass}`} />
            <div className={`h-2.5 w-20 rounded ${shimmerClass}`} />
          </div>
          <div className="flex justify-between items-center">
            <div className={`h-2.5 w-14 rounded ${shimmerClass}`} />
            <div className={`h-2.5 w-16 rounded ${shimmerClass}`} />
          </div>
        </div>
      </div>

      {/* CTA Button Skeleton */}
      <div className={`w-full h-9 sm:h-10 rounded-xl ${shimmerClass} mt-auto`} />
    </div>
  );
};
