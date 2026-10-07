import { useEffect } from 'react'

/** Keeps <title> and the description meta tag in sync with the route. */
export function usePageMeta(title: string, description?: string) {
  useEffect(() => {
    const previousTitle = document.title
    const meta = document.querySelector<HTMLMetaElement>('meta[name="description"]')
    const previousDescription = meta?.content

    document.title = title
    if (description && meta) meta.content = description

    return () => {
      document.title = previousTitle
      if (previousDescription && meta) meta.content = previousDescription
    }
  }, [title, description])
}
