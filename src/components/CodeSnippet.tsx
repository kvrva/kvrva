import React, { useState, useEffect } from 'react';
import { Terminal as TerminalIcon, FileCode, Cpu } from 'lucide-react';

type Tab = 'fastapi' | 'nestjs' | 'terminal';

export const CodeSnippet: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('fastapi');
  const [terminalLines, setTerminalLines] = useState<string[]>([]);
  const [isDeploying, setIsDeploying] = useState(false);

  const fastapiCode = `from fastapi import FastAPI, Depends
from pydantic import BaseModel
from kvrva.core import MLModel, Cache

app = FastAPI(title="KVRVA Scalable API")

class PredictionRequest(BaseModel):
    data: list[float]
    model_version: str = "v2.4-stable"

@app.post("/api/v1/predict")
async def predict(
    req: PredictionRequest,
    model: MLModel = Depends(MLModel.load),
    cache: Cache = Depends(Cache.get_instance)
):
    # Retrieve cached prediction or evaluate model
    cached_res = await cache.get(req.data)
    if cached_res:
        return {"status": "success", "result": cached_res, "cached": True}
        
    result = await model.evaluate(req.data)
    await cache.set(req.data, result, expire=3600)
    return {"status": "success", "result": result, "cached": False}`;

  const nestjsCode = `import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from './guards/auth.guard';
import { PipelineService } from './services/pipeline.service';

@ApiTags('Pipelines')
@Controller('api/v1/pipelines')
export class PipelineController {
  constructor(private readonly pipelineService: PipelineService) {}

  @Post('run')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Trigger enterprise data pipeline' })
  async triggerPipeline(@Body() payload: PipelineDto) {
    const job = await this.pipelineService.enqueue(payload);
    return {
      jobId: job.id,
      status: 'queued',
      timestamp: new Date().toISOString()
    };
  }
}`;

  const startDeployment = () => {
    if (isDeploying) return;
    setIsDeploying(true);
    setTerminalLines(['$ kvrva deploy --prod --target=kubernetes']);
    
    const logs = [
      '⚡ kvrva-cli v1.4.2 initialized',
      '📦 Bundling source files...',
      '🐳 Building Docker multi-stage container...',
      '🐳 Docker build step 1/8: FROM python:3.11-alpine',
      '🐳 Docker build step 8/8: EXPOSE 8000',
      '✅ Container image build success: kvrva-api:latest (132MB)',
      '🌐 Push container to private registry: gcr.io/kvrva-prod/api',
      '🔒 Security scanned: 0 vulnerabilities found',
      '☸️ Connecting to Kubernetes cluster: k8s-us-central',
      '☸️ Updating deployment manifest (RollingUpdate)...',
      '⏳ Waiting for 3 replicas to reach healthy state...',
      '🟢 Replica pod-kvrva-api-7c89f5f5-abcde healthy',
      '🟢 Replica pod-kvrva-api-7c89f5f5-fghij healthy',
      '🟢 Replica pod-kvrva-api-7c89f5f5-klmno healthy',
      '🚀 Traffic successfully routed through Cloudflare CDN',
      '🚀 Deployment Completed Successfully! [https://api.kvrva.com]'
    ];

    logs.forEach((line, index) => {
      setTimeout(() => {
        setTerminalLines(prev => [...prev, line]);
        if (index === logs.length - 1) {
          setIsDeploying(false);
        }
      }, (index + 1) * 600);
    });
  };

  useEffect(() => {
    if (activeTab === 'terminal' && terminalLines.length === 0) {
      startDeployment();
    }
  }, [activeTab]);

  const escapeHtml = (text: string) => {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  };

  const highlightPythonLine = (line: string) => {
    const pythonKeywords = new Set([
      'from', 'import', 'async', 'def', 'return', 'class', 'True', 'False', 'await', 'None', 'and', 'or', 'in', 'is', 'not', 'if'
    ]);
    const pythonTypes = new Set([
      'Depends', 'BaseModel', 'FastAPI', 'MLModel', 'Cache', 'list', 'str', 'float'
    ]);

    const tokenRegex = /(#.*)|(".*?"|'.*?')|(@\w+(?:\.\w+)?)|([a-zA-Z_]\w*)|([^\w@#''"\s]+)|\s+/g;
    return line.replace(tokenRegex, (token, comment, str, decorator, word) => {
      if (comment) return `<span class="text-gray-500">${escapeHtml(comment)}</span>`;
      if (str) return `<span class="text-emerald-400">${escapeHtml(str)}</span>`;
      if (decorator) return `<span class="text-yellow-400">${escapeHtml(decorator)}</span>`;
      if (word) {
        if (pythonKeywords.has(word)) return `<span class="text-purple-400">${word}</span>`;
        if (pythonTypes.has(word)) return `<span class="text-blue-400">${word}</span>`;
      }
      return token;
    });
  };

  const highlightNestJSLine = (line: string) => {
    const nestKeywords = new Set([
      'import', 'from', 'export', 'class', 'constructor', 'private', 'readonly', 'async', 'return', 'new', 'const', 'await'
    ]);
    const nestTypes = new Set([
      'PipelineController', 'PipelineService', 'AuthGuard', 'PipelineDto', 'Date'
    ]);

    const tokenRegex = /(\/\/.*)|(".*?"|'.*?')|(@\w+)|([a-zA-Z_]\w*)|([^\w@/''"\s]+)|\s+/g;
    return line.replace(tokenRegex, (token, comment, str, decorator, word) => {
      if (comment) return `<span class="text-gray-500">${escapeHtml(comment)}</span>`;
      if (str) return `<span class="text-emerald-400">${escapeHtml(str)}</span>`;
      if (decorator) return `<span class="text-yellow-400">${escapeHtml(decorator)}</span>`;
      if (word) {
        if (nestKeywords.has(word)) return `<span class="text-purple-400">${word}</span>`;
        if (nestTypes.has(word)) return `<span class="text-blue-400">${word}</span>`;
      }
      return token;
    });
  };

  return (
    <div className="w-full max-w-2xl mx-auto rounded-xl overflow-hidden glass border border-border-primary shadow-2xl relative text-left select-none">
      {/* Top window controls */}
      <div className="flex items-center justify-between px-4 py-3 bg-bg-secondary border-b border-border-primary select-none">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
        </div>
        
        {/* Title/Label */}
        <div className="hidden sm:flex items-center gap-1.5 text-xs text-text-tertiary font-mono">
          <Cpu className="w-3.5 h-3.5 animate-pulse text-accent-primary" />
          <span>production-cluster</span>
        </div>

        {/* Tab selection */}
        <div className="flex bg-bg-primary rounded-md p-0.5 border border-border-primary">
          <button 
            onClick={() => setActiveTab('fastapi')}
            className={`flex items-center gap-0.5 sm:gap-1 px-1.5 sm:px-2.5 py-1 text-xs font-medium rounded-sm transition-all cursor-pointer ${
              activeTab === 'fastapi' 
                ? 'bg-bg-tertiary text-text-primary border border-border-primary/50' 
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            <FileCode className="hidden sm:block w-3.5 h-3.5 text-cyan-400" />
            <span>FastAPI</span>
          </button>
          <button 
            onClick={() => setActiveTab('nestjs')}
            className={`flex items-center gap-0.5 sm:gap-1 px-1.5 sm:px-2.5 py-1 text-xs font-medium rounded-sm transition-all cursor-pointer ${
              activeTab === 'nestjs' 
                ? 'bg-bg-tertiary text-text-primary border border-border-primary/50' 
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            <FileCode className="hidden sm:block w-3.5 h-3.5 text-red-400" />
            <span>NestJS</span>
          </button>
          <button 
            onClick={() => setActiveTab('terminal')}
            className={`flex items-center gap-0.5 sm:gap-1 px-1.5 sm:px-2.5 py-1 text-xs font-medium rounded-sm transition-all cursor-pointer ${
              activeTab === 'terminal' 
                ? 'bg-bg-tertiary text-text-primary border border-border-primary/50' 
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            <TerminalIcon className="hidden sm:block w-3.5 h-3.5 text-green-400" />
            <span>Terminal</span>
          </button>
        </div>
      </div>

      {/* Code Area */}
      <div className="p-5 font-mono text-xs sm:text-sm overflow-x-auto min-h-[360px] bg-[#050507] text-[#e2e8f0] relative">
        {activeTab === 'fastapi' && (
          <pre className="text-xs sm:text-sm leading-relaxed text-[#c9d1d9]">
            {fastapiCode.split('\n').map((line, i) => {
              const lineHtml = highlightPythonLine(line);
              return (
                <div key={i} className="table-row">
                  <span className="table-cell text-right pr-4 select-none text-text-tertiary w-6 text-xs">{i + 1}</span>
                  <span className="table-cell" dangerouslySetInnerHTML={{ __html: lineHtml }} />
                </div>
              );
            })}
          </pre>
        )}

        {activeTab === 'nestjs' && (
          <pre className="text-xs sm:text-sm leading-relaxed text-[#c9d1d9]">
            {nestjsCode.split('\n').map((line, i) => {
              const lineHtml = highlightNestJSLine(line);
              return (
                <div key={i} className="table-row">
                  <span className="table-cell text-right pr-4 select-none text-text-tertiary w-6 text-xs">{i + 1}</span>
                  <span className="table-cell" dangerouslySetInnerHTML={{ __html: lineHtml }} />
                </div>
              );
            })}
          </pre>
        )}

        {activeTab === 'terminal' && (
          <div className="text-xs sm:text-sm font-mono leading-relaxed space-y-1">
            {terminalLines.map((line, index) => {
              const isCommand = line.startsWith('$');
              const isSuccess = line.startsWith('✅') || line.startsWith('🟢') || line.startsWith('🚀');
              const isProgress = line.startsWith('⏳') || line.startsWith('🐳') || line.startsWith('📦') || line.startsWith('🔒') || line.startsWith('☸️');
              const isWarning = line.includes('warning');

              let colorClass = 'text-text-secondary';
              if (isCommand) colorClass = 'text-purple-400 font-bold';
              else if (isSuccess) colorClass = 'text-green-400';
              else if (isProgress) colorClass = 'text-cyan-400';
              else if (isWarning) colorClass = 'text-yellow-400';

              return (
                <div key={index} className={`flex items-start ${colorClass}`}>
                  {isCommand ? null : <span className="text-text-tertiary mr-2 select-none">&gt;</span>}
                  <span className="flex-1 whitespace-pre-wrap">{line}</span>
                </div>
              );
            })}
            {isDeploying && (
              <div className="flex items-center gap-2 text-cyan-400 animate-pulse mt-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                <span>compiling and provisioning resources...</span>
              </div>
            )}
            {!isDeploying && terminalLines.length > 0 && (
              <button 
                onClick={startDeployment}
                className="mt-4 px-3 py-1.5 text-xs rounded bg-accent-primary/10 hover:bg-accent-primary/20 text-accent-primary border border-accent-primary/20 transition-all font-sans cursor-pointer"
              >
                Re-run Deployment
              </button>
            )}
          </div>
        )}
      </div>

      {/* Floating abstract decorative icons to show quality */}
      <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-accent-primary/5 rounded-full blur-xl pointer-events-none" />
    </div>
  );
};
