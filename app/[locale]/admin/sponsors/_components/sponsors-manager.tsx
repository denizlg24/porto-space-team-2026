"use client";

import { useIntlayer } from "next-intlayer";
import { useState, useTransition, useOptimistic, useCallback } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { SponsorCategoryItem, SponsorItem } from "@/lib/actions/sponsors";
import { CategoriesList } from "./categories-list";
import { SponsorsList } from "./sponsors-list";

interface SponsorsManagerProps {
  initialCategories: SponsorCategoryItem[];
  initialSponsors: SponsorItem[];
}

type CategoryAction =
  | { type: "add"; category: SponsorCategoryItem }
  | { type: "update"; category: SponsorCategoryItem }
  | { type: "delete"; categoryId: string }
  | { type: "reorder"; categories: SponsorCategoryItem[] };

type SponsorAction =
  | { type: "add"; sponsor: SponsorItem }
  | { type: "update"; sponsor: SponsorItem }
  | { type: "delete"; sponsorId: string }
  | { type: "reorder"; sponsors: SponsorItem[] };

export function SponsorsManager({
  initialCategories,
  initialSponsors,
}: SponsorsManagerProps) {
  const content = useIntlayer("admin-sponsors-page");
  const [isPending, startTransition] = useTransition();

  const [categories, setCategories] = useState(initialCategories);
  const [sponsors, setSponsors] = useState(initialSponsors);

  const [optimisticCategories, updateOptimisticCategories] = useOptimistic(
    categories,
    (state: SponsorCategoryItem[], action: CategoryAction) => {
      switch (action.type) {
        case "add":
          return [...state, action.category];
        case "update":
          return state.map((c) =>
            c.id === action.category.id ? action.category : c
          );
        case "delete":
          return state.filter((c) => c.id !== action.categoryId);
        case "reorder":
          return action.categories;
        default:
          return state;
      }
    }
  );

  const [optimisticSponsors, updateOptimisticSponsors] = useOptimistic(
    sponsors,
    (state: SponsorItem[], action: SponsorAction) => {
      switch (action.type) {
        case "add":
          return [...state, action.sponsor];
        case "update":
          return state.map((s) =>
            s.id === action.sponsor.id ? action.sponsor : s
          );
        case "delete":
          return state.filter((s) => s.id !== action.sponsorId);
        case "reorder":
          return action.sponsors;
        default:
          return state;
      }
    }
  );

  const handleCategoryAdd = useCallback(
    (category: SponsorCategoryItem) => {
      setCategories((prev) => [...prev, category]);
    },
    []
  );

  const handleCategoryUpdate = useCallback(
    (category: SponsorCategoryItem) => {
      setCategories((prev) =>
        prev.map((c) => (c.id === category.id ? category : c))
      );
    },
    []
  );

  const handleCategoryDelete = useCallback((categoryId: string) => {
    setCategories((prev) => prev.filter((c) => c.id !== categoryId));
  }, []);

  const handleCategoriesReorder = useCallback(
    (newCategories: SponsorCategoryItem[]) => {
      setCategories(newCategories);
    },
    []
  );

  const handleSponsorAdd = useCallback((sponsor: SponsorItem) => {
    setSponsors((prev) => [...prev, sponsor]);
  }, []);

  const handleSponsorUpdate = useCallback((sponsor: SponsorItem) => {
    setSponsors((prev) =>
      prev.map((s) => (s.id === sponsor.id ? sponsor : s))
    );
  }, []);

  const handleSponsorDelete = useCallback((sponsorId: string) => {
    setSponsors((prev) => prev.filter((s) => s.id !== sponsorId));
  }, []);

  const handleSponsorsReorder = useCallback((newSponsors: SponsorItem[]) => {
    setSponsors(newSponsors);
  }, []);

  return (
    <Tabs defaultValue="categories" className="space-y-4">
      <TabsList>
        <TabsTrigger value="categories">{content.tabs.categories}</TabsTrigger>
        <TabsTrigger value="sponsors">{content.tabs.sponsors}</TabsTrigger>
      </TabsList>

      <TabsContent value="categories" className="space-y-4">
        <CategoriesList
          categories={optimisticCategories}
          sponsors={optimisticSponsors}
          isPending={isPending}
          startTransition={startTransition}
          updateOptimistic={updateOptimisticCategories}
          onAdd={handleCategoryAdd}
          onUpdate={handleCategoryUpdate}
          onDelete={handleCategoryDelete}
          onReorder={handleCategoriesReorder}
        />
      </TabsContent>

      <TabsContent value="sponsors" className="space-y-4">
        <SponsorsList
          categories={optimisticCategories}
          sponsors={optimisticSponsors}
          isPending={isPending}
          startTransition={startTransition}
          updateOptimistic={updateOptimisticSponsors}
          onAdd={handleSponsorAdd}
          onUpdate={handleSponsorUpdate}
          onDelete={handleSponsorDelete}
          onReorder={handleSponsorsReorder}
        />
      </TabsContent>
    </Tabs>
  );
}
