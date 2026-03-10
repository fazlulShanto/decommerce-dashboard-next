"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Bot, Save, Sparkles, Cpu, Settings2, Search } from "lucide-react";
import { AgentConfig } from "@/models/aiAgentConfig.dal";
import { updateAgentConfigAction } from "./agent.actions";
import { toast } from "sonner";

interface StoreAgentConfigProps {
  config: AgentConfig;
  guildId: string;
}

export const allowedChatModels = [
  
  { "label": "GPT OSS 20B", "value": "gpt-oss:20b" },
  { "label": "GPT OSS 120B", "value": "gpt-oss:120b" },
  { "label": "Gemini 3 Flash Preview", "value": "gemini-3-flash-preview" },
  { "label": "Mistral Large 3 (675B)", "value": "mistral-large-3:675b" },
  { "label": "Qwen 3.5 (397B)", "value": "qwen3.5:397b" },
  { "label": "DeepSeek V3.2", "value": "deepseek-v3.2" },
  { "label": "GLM 5", "value": "glm-5" },
  { "label": "Kimi K2.5", "value": "kimi-k2.5" },
  { "label": "Kimi K2 (1T)", "value": "kimi-k2:1t" },
  { "label": "Gemma 3 (27B)", "value": "gemma3:27b" },
  { "label": "GLM 4.6", "value": "glm-4.6" },
  { "label": "MiniMax M2.5", "value": "minimax-m2.5" },
  { "label": "Qwen 3 Coder (480B)", "value": "qwen3-coder:480b" },
  { "label": "Ministral 3 (14B)", "value": "ministral-3:14b" },
  { "label": "cogito-2.1:671b", "value": "cogito-2.1:671b" },
  { "label": "glm-4.7", "value": "glm-4.7" },
  { "label": "minimax-m2.1", "value": "minimax-m2.1" },
  { "label": "nemotron-3-nano:30b", "value": "nemotron-3-nano:30b" }
];

export const allowedEmbeddingModels = [{
  label: "Gemini embedding 001",
  value : "gemini-embedding-001"
}]

export default function StoreAgentConfig({ config, guildId }: StoreAgentConfigProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    systemPrompt: config.systemPrompt || "",
    chatModel: config.chatModel || "",
    embeddingModel: config.embeddingModel || "",
    fallbackModel: config.fallbackModel || "",
    temperature: config.temperature ?? 0.7,
    topP: config.topP ?? 0.5,
    retriverScroreThreshold: config.retriverScroreThreshold ?? 0.5,
    retriverTopK: config.retriverTopK ?? 4,
  });

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const result = await updateAgentConfigAction(guildId, formData);
      if (result.success) {
        toast.success("Agent configuration updated successfully");
      } else {
        toast.error(result.error || "Failed to update configuration");
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-6 space-y-6 max-w-4xl mx-auto pb-10">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
            <Bot className="h-6 w-6 text-cyan-400" />
            AI Agent Configuration
          </h2>
          <p className="text-slate-400">Manage your Discord AI assistant's personality and technical settings.</p>
        </div>
        <Button 
          onClick={handleSave} 
          disabled={loading}
          className="bg-cyan-600 hover:bg-cyan-500 text-white gap-2 px-6"
        >
          {loading ? (
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
          ) : (
            <Save className="h-4 w-4" />
          )}
          Save Changes
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Personality & Prompt */}
        <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-cyan-400">
              <Sparkles className="h-5 w-5" />
              Agent Personality
            </CardTitle>
            <CardDescription className="text-slate-400">
              Define the system prompt that guides your agent's behavior and responses.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="systemPrompt">System Prompt</Label>
              <Textarea
                id="systemPrompt"
                placeholder="Enter system prompt..."
                className="min-h-[150px] bg-slate-800/50 border-slate-700 focus:border-cyan-500/50 text-slate-200"
                value={formData.systemPrompt}
                onChange={(e) => handleChange("systemPrompt", e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Model Settings */}
        <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-purple-400">
              <Cpu className="h-5 w-5" />
              Models
            </CardTitle>
            <CardDescription className="text-slate-400">
              Select the AI models for different tasks.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="chatModel">Chat Model</Label>
              <Select value={formData.chatModel} onValueChange={(value) => handleChange("chatModel", value)}>
                <SelectTrigger className="bg-slate-800/50 border-slate-700 focus:border-purple-500/50 text-slate-200">
                  <SelectValue placeholder="Select Chat Model" />
                </SelectTrigger>
                <SelectContent>
                  {allowedChatModels.map( v => 
                    <SelectItem value={v.value}> {v.label} </SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="embeddingModel">Embedding Model</Label>
              <Select value={formData.embeddingModel} onValueChange={(value) => handleChange("embeddingModel", value)}>
                <SelectTrigger className="bg-slate-800/50 border-slate-700 focus:border-purple-500/50 text-slate-200">
                  <SelectValue placeholder="Select Embedding Model" />
                </SelectTrigger>
                <SelectContent>
                   {allowedEmbeddingModels.map(v => <SelectItem value={v.value}> {v.label} </SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="fallbackModel">Fallback Model</Label>
              <Select value={formData.fallbackModel} onValueChange={(value) => handleChange("fallbackModel", value)}>
                <SelectTrigger className="bg-slate-800/50 border-slate-700 focus:border-purple-500/50 text-slate-200">
                  <SelectValue placeholder="Select Fallback Model" />
                </SelectTrigger>
                <SelectContent>
                  {allowedEmbeddingModels.map(v => <SelectItem value={v.value}> {v.label} </SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Parameters */}
        <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-400">
              <Settings2 className="h-5 w-5" />
              Parameters
            </CardTitle>
            <CardDescription className="text-slate-400">
              Fine-tune the model's output generation.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8 pt-4">
            <div className="space-y-4">
              <div className="flex justify-between">
                <Label>Temperature: {formData.temperature}</Label>
              </div>
              <Slider
                min={0}
                max={2}
                step={0.1}
                value={[formData.temperature]}
                onValueChange={([v]) => handleChange("temperature", v)}
                className="py-4"
              />
            </div>
            <div className="space-y-4">
              <div className="flex justify-between">
                <Label>Top P: {formData.topP}</Label>
              </div>
              <Slider
                min={0}
                max={1}
                step={0.05}
                value={[formData.topP]}
                onValueChange={([v]) => handleChange("topP", v)}
                className="py-4"
              />
            </div>
          </CardContent>
        </Card>

        {/* Retrieval Settings */}
        <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-400">
              <Search className="h-5 w-5" />
              Retrieval Settings
            </CardTitle>
            <CardDescription className="text-slate-400">
              Configure how the agent retrieves information from the knowledge base.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
            <div className="space-y-4">
              <div className="flex justify-between">
                <Label>Score Threshold: {formData.retriverScroreThreshold}</Label>
              </div>
              <Slider
                min={0}
                max={1}
                step={0.05}
                value={[formData.retriverScroreThreshold]}
                onValueChange={([v]) => handleChange("retriverScroreThreshold", v)}
                className="py-4"
              />
              <p className="text-xs text-slate-500">Minimum relevance score for retrieved chunks.</p>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between">
                <Label>Top K: {formData.retriverTopK}</Label>
              </div>
              <Slider
                min={1}
                max={10}
                step={1}
                value={[formData.retriverTopK]}
                onValueChange={([v]) => handleChange("retriverTopK", v)}
                className="py-4"
              />
              <p className="text-xs text-slate-500">Number of top relevant chunks to retrieve.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
