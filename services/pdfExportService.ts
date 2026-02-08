import * as Print from 'expo-print'
import * as Sharing from 'expo-sharing'
import { IMessage } from 'react-native-gifted-chat'

export interface MessageForPDF {
  role: 'user' | 'assistant'
  content: string
  timestamp: string
}

export class PDFExportService {
  static async exportChatToPDF(messages: IMessage[]): Promise<void> {
    try {
      // Transform messages to PDF format
      const pdfMessages: MessageForPDF[] = messages.map(msg => ({
        role: msg.user._id === 1 ? 'user' : 'assistant',
        content: msg.text,
        timestamp: new Date(msg.createdAt).toLocaleString(),
      }))

      // Generate HTML content
      const htmlContent = this.generateHTML(pdfMessages)

      // Generate PDF file
      const { uri } = await Print.printToFileAsync({
        html: htmlContent,
        base64: false,
      })

      // Share the PDF
      await Sharing.shareAsync(uri, {
        mimeType: 'application/pdf',
        dialogTitle: 'Export Chat Transcript',
        UTI: 'com.adobe.pdf',
      })

      console.log('PDF exported successfully:', uri)
    } catch (error) {
      console.error('Error exporting PDF:', error)
      throw new Error('Failed to export PDF. Please try again.')
    }
  }

  private static generateHTML(messages: MessageForPDF[]): string {
    const messagesHTML = messages
      .map(msg => {
        const messageClass =
          msg.role === 'user' ? 'user-message' : 'assistant-message'
        const roleLabel = msg.role === 'user' ? 'You' : 'AI Assistant'

        return `
          <div class="message ${messageClass}">
            <div class="message-header">
              <span class="role">${roleLabel}</span>
              <span class="timestamp">${msg.timestamp}</span>
            </div>
            <div class="message-content">
              ${this.convertMarkdownToHTML(msg.content)}
            </div>
          </div>
        `
      })
      .join('')

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Pre-Authorization Chat Transcript</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background-color: #fafafa;
          }
          
          .header {
            text-align: center;
            margin-bottom: 30px;
            padding-bottom: 20px;
            border-bottom: 2px solid #e5e7eb;
          }
          
          .header h1 {
            color: #1f2937;
            margin: 0;
            font-size: 24px;
            font-weight: 600;
          }
          
          .header .subtitle {
            color: #6b7280;
            margin-top: 5px;
            font-size: 14px;
          }
          
          .message {
            margin-bottom: 20px;
            border-radius: 8px;
            overflow: hidden;
          }
          
          .user-message {
            background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
            border-left: 4px solid #2563eb;
          }
          
          .assistant-message {
            background: #ffffff;
            border-left: 4px solid #10b981;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          }
          
          .message-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 12px 16px 8px;
            border-bottom: 1px solid rgba(0, 0, 0, 0.05);
          }
          
          .role {
            font-weight: 600;
            font-size: 14px;
            color: #374151;
          }
          
          .timestamp {
            font-size: 12px;
            color: #9ca3af;
          }
          
          .message-content {
            padding: 12px 16px 16px;
            font-size: 14px;
            line-height: 1.6;
          }
          
          .message-content h1 {
            font-size: 18px;
            font-weight: 600;
            margin: 16px 0 8px;
            color: #1f2937;
          }
          
          .message-content h2 {
            font-size: 16px;
            font-weight: 600;
            margin: 14px 0 6px;
            color: #1f2937;
          }
          
          .message-content h3 {
            font-size: 15px;
            font-weight: 600;
            margin: 12px 0 6px;
            color: #1f2937;
          }
          
          .message-content p {
            margin: 8px 0;
          }
          
          .message-content ul, .message-content ol {
            margin: 8px 0;
            padding-left: 20px;
          }
          
          .message-content li {
            margin: 4px 0;
          }
          
          .message-content strong {
            font-weight: 600;
            color: #1f2937;
          }
          
          .message-content em {
            font-style: italic;
            color: #4b5563;
          }
          
          .message-content code {
            background: #f3f4f6;
            padding: 2px 6px;
            border-radius: 4px;
            font-family: 'Monaco', 'Menlo', monospace;
            font-size: 13px;
          }
          
          .footer {
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #e5e7eb;
            text-align: center;
            color: #9ca3af;
            font-size: 12px;
          }
          
          @media print {
            body { background-color: #fff; }
            .message { page-break-inside: avoid; }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Pre-Authorization Chat Transcript</h1>
          <div class="subtitle">Generated on ${new Date().toLocaleString()}</div>
        </div>
        
        <div class="messages">
          ${messagesHTML}
        </div>
        
        <div class="footer">
          <p>This document was generated from a secure medical consultation platform.</p>
          <p>© ${new Date().getFullYear()} noteDoctor AI - All rights reserved.</p>
        </div>
      </body>
      </html>
    `
  }

  private static convertMarkdownToHTML(markdown: string): string {
    return (
      markdown
        // Headers
        .replace(/^### (.*$)/gim, '<h3>$1</h3>')
        .replace(/^## (.*$)/gim, '<h2>$1</h2>')
        .replace(/^# (.*$)/gim, '<h1>$1</h1>')
        // Bold
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
        // Italic
        .replace(/\*(.+?)\*/g, '<em>$1</em>')
        // Code
        .replace(/`(.+?)`/g, '<code>$1</code>')
        // Line breaks
        .replace(/\n\n/g, '</p><p>')
        .replace(/\n/g, '<br>')
        // Wrap in paragraphs
        .replace(/^(.+)$/gm, '<p>$1</p>')
        // Clean up empty paragraphs
        .replace(/<p><\/p>/g, '')
        .replace(/<p>(<h[1-6]>)/g, '$1')
        .replace(/(<\/h[1-6]>)<\/p>/g, '$1')
        // Lists
        .replace(/^\* (.+)$/gim, '<li>$1</li>')
        .replace(/(<li>.*<\/li>)/gs, '<ul>$1</ul>')
    )
  }
}
