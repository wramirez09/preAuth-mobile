import * as Print from 'expo-print'
import * as Sharing from 'expo-sharing'
import { marked } from 'marked'
import { IMessage } from 'react-native-gifted-chat'

export interface MessageForPDF {
  role: 'user' | 'assistant'
  content: string
  timestamp: string
}

export class PDFExportService {
  static async exportChatToPDF(
    messages: IMessage[]
  ): Promise<{ pdfGenerated: boolean }> {
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
      return { pdfGenerated: true }
    } catch (error) {
      console.error('Error exporting PDF:', error)
      throw new Error('Failed to export PDF. Please try again.')
    }
  }

  private static generateHTML(messages: MessageForPDF[]): string {
    // Separate user and assistant messages
    const userMessages = messages.filter(msg => msg.role === 'user')
    const assistantMessages = messages.filter(msg => msg.role === 'assistant')

    // Generate HTML for user messages first
    const userMessagesHTML = userMessages
      .map(
        msg => `
        <div class="message user-message">
          <div class="message-header">
            <span class="role">You</span>
            <span class="timestamp">${msg.timestamp}</span>
          </div>
          <div class="message-content prose prose-sm max-w-none">
            <p>${msg.content}</p>
          </div>
        </div>
      `
      )
      .join('')

    // Generate HTML for assistant messages
    const assistantMessagesHTML = assistantMessages
      .map(
        msg => `
        <div class="message assistant-message">
          <div class="message-header">
            <span class="role">AI Assistant</span>
            <span class="timestamp">${msg.timestamp}</span>
          </div>
          <div class="message-content prose prose-sm max-w-none">
            ${marked(msg.content)}
          </div>
        </div>
      `
      )
      .join('')

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Pre-Authorization Chat Transcript</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <script>
          tailwind.config = {
            plugins: {
              '@tailwindcss/typography': {}
            }
          }
        </script>
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
          <div class="section">
            <h2 class="text-xl font-semibold mb-4 text-blue-600">User Queries</h2>
            ${userMessagesHTML}
          </div>
          
          <div class="section mt-8">
            <h2 class="text-xl font-semibold mb-4 text-green-600">AI Assistant Responses</h2>
            ${assistantMessagesHTML}
          </div>
        </div>
        
        <div class="footer">
          <p>This document was generated from a secure medical consultation platform.</p>
          <p>© ${new Date().getFullYear()} noteDoctor AI - All rights reserved.</p>
        </div>
      </body>
      </html>
    `
  }
}
