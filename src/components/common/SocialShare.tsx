import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
} from 'react-share'
import { copyToClipboard } from '@/utils'
import toast from 'react-hot-toast'

interface SocialShareProps {
  url: string
  title: string
  description?: string
}

export default function SocialShare({ url, title, description }: SocialShareProps) {
  const { t } = useTranslation()
  const [copied, setCopied] = useState(false)

  const handleCopyLink = async () => {
    const success = await copyToClipboard(url)
    if (success) {
      setCopied(true)
      toast.success(t('social.linkCopied'))
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="flex items-center space-x-3">
      <span className="text-sm text-gray-700 font-medium">{t('social.shareOn')}:</span>
      
      <FacebookShareButton url={url} quote={title}>
        <FacebookIcon size={32} round />
      </FacebookShareButton>

      <TwitterShareButton url={url} title={title}>
        <TwitterIcon size={32} round />
      </TwitterShareButton>

      <WhatsappShareButton url={url} title={title}>
        <WhatsappIcon size={32} round />
      </WhatsappShareButton>

      <button
        onClick={handleCopyLink}
        className="px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
      >
        {copied ? t('social.linkCopied') : t('social.copyLink')}
      </button>
    </div>
  )
}
