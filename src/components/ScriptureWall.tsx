
import React, { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "./ui/button";

type SharedVerse = {
  id: string;
  verse_text: string;
  verse_reference: string;
  shared_by: string;
  created_at: string;
};

const ScriptureWall = () => {
  const [verses, setVerses] = useState<SharedVerse[]>([]);
  const [newVerse, setNewVerse] = useState({ text: '', reference: '', name: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchVerses();
  }, []);

  const fetchVerses = async () => {
    const { data, error } = await supabase
      .from('scripture_wall')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to load verses. Please try again later.",
        variant: "destructive",
      });
      return;
    }

    setVerses(data || []);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVerse.text || !newVerse.reference || !newVerse.name) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    const { error } = await supabase.from('scripture_wall').insert([
      {
        verse_text: newVerse.text,
        verse_reference: newVerse.reference,
        shared_by: newVerse.name,
      },
    ]);

    setIsSubmitting(false);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to share verse. Please try again.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Success",
      description: "Your verse has been shared!",
    });

    setNewVerse({ text: '', reference: '', name: '' });
    fetchVerses();
  };

  return (
    <div className="py-12 bg-slate-900">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-foreground">Virtual Scripture Wall</h2>
        
        <form onSubmit={handleSubmit} className="mb-12 bg-slate-800 p-6 rounded-lg">
          <div className="space-y-4">
            <div>
              <label htmlFor="verse-text" className="block text-sm font-medium text-foreground mb-1">
                Verse Text
              </label>
              <textarea
                id="verse-text"
                value={newVerse.text}
                onChange={(e) => setNewVerse({ ...newVerse, text: e.target.value })}
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-foreground"
                rows={3}
                placeholder="Enter your favorite verse..."
              />
            </div>
            <div>
              <label htmlFor="verse-reference" className="block text-sm font-medium text-foreground mb-1">
                Reference
              </label>
              <input
                id="verse-reference"
                type="text"
                value={newVerse.reference}
                onChange={(e) => setNewVerse({ ...newVerse, reference: e.target.value })}
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-foreground"
                placeholder="e.g., John 3:16"
              />
            </div>
            <div>
              <label htmlFor="shared-by" className="block text-sm font-medium text-foreground mb-1">
                Your Name
              </label>
              <input
                id="shared-by"
                type="text"
                value={newVerse.name}
                onChange={(e) => setNewVerse({ ...newVerse, name: e.target.value })}
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-foreground"
                placeholder="Enter your name"
              />
            </div>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full"
            >
              {isSubmitting ? 'Sharing...' : 'Share Verse'}
            </Button>
          </div>
        </form>

        <div className="grid gap-6">
          {verses.map((verse) => (
            <div key={verse.id} className="bg-slate-800 p-6 rounded-lg">
              <blockquote className="text-lg italic mb-2 text-foreground">"{verse.verse_text}"</blockquote>
              <div className="text-sm text-foreground/80">
                <span className="font-medium">{verse.verse_reference}</span>
                <span className="mx-2">•</span>
                <span>Shared by {verse.shared_by}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScriptureWall;
