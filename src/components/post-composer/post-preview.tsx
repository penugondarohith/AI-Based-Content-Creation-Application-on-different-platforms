"use client";

import type { ComposedPost } from "@/types/composed-post";
import { PostRenderer } from "@/components/post-composer/post-renderer";

export function PostPreview({ post }: { post: ComposedPost }) {
  return (
    <section className="rounded-xl border border-border bg-surface p-5">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[.18em] text-primary">Live preview</p>
          <h3 className="mt-2 text-xl font-semibold">Final post creative</h3>
        </div>
        <span className="rounded-full border border-emerald-400/30 bg-emerald-500/10 px-2.5 py-1 text-[10px] font-medium text-emerald-300">
          {post.status}
        </span>
      </div>
      <div className="flex justify-center">
        <PostRenderer post={post} />
      </div>
    </section>
  );
}
