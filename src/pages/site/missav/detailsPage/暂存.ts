/**
 *  处理女优头像
 */
function getActressAvatar() {
  const links = document.querySelectorAll('.space-y-2 > div:nth-child(4) a')

  console.log('%c Line:198 🍕 links', 'color:#f5ce50', links)
  links.forEach((link) => {
    // 确保 link 是 HTMLAnchorElement 类型
    if (!(link instanceof HTMLAnchorElement)) {
      return
    }

    // 获取当前 link 的地址
    const actressesLink = link.href

    fetch(actressesLink)
      .then(response => response.text())
      .then((html) => {
        const parser = new DOMParser()

        const doc = parser.parseFromString(html, 'text/html')

        const imgElement = doc.querySelector('.bg-norddark img') as HTMLImageElement

        const profile = doc.querySelector('.font-medium.text-lg.leading-6')

        if (!profile) {
          return
        }

        // 收藏按钮
        const saveBtn = profile.querySelector('div.hero-pattern button')

        if (!saveBtn) {
          return
        }

        // 直接删除按钮,不然会直接保存当前页面的影片
        saveBtn.remove()

        // 名字转链接.
        const h4Element = profile.querySelector('h4')

        if (h4Element) {
          h4Element.innerHTML = `<a href="${actressesLink}">${h4Element.textContent}</a>`
        }

        const profileDiv = document.createElement('div')

        profileDiv.classList.add('font-medium', 'text-lg', 'leading-6', 'hidden', 'absolute', 'bg-black/70', 'text-white', 'p-2', 'rounded-lg', 'z-1000', 'whitespace-nowrap')

        // 如果女优的图片存在
        if (imgElement) {
          // 显示大图片
          profileDiv.innerHTML = `<img src="${imgElement.src.replace('-t', '')}" alt="I AM YOUR FATHER" class="object-cover object-top w-full h-full">`

          // 显示小图片
          link.innerHTML = `<img src="${imgElement.src}" width="30" height="30" class="ml-2 inline-block align-middle">${link.innerHTML}`
        }
        else {
          console.log('🔍 ~ 未找到图片,不添加这个女优.')
        }

        profileDiv.appendChild(profile)

        if (link.parentElement) {
          link.parentElement.appendChild(profileDiv)
        }

        link.addEventListener('mouseenter', () => {
          document.querySelectorAll('.ChinaGodMan').forEach((element) => {
            if (element instanceof HTMLElement) {
              element.style.display = 'none'
            }
          })
          profileDiv.style.display = 'block'
          const rect = link.getBoundingClientRect()

          profileDiv.style.top = `${rect.top + window.scrollY + rect.height - 20}px`
          profileDiv.style.left = `${rect.left + window.scrollX}px`
        })

        profileDiv.addEventListener('mouseleave', () => {
          profileDiv.style.display = 'none'
        })
      })
      .catch((error) => {
        console.error('🔍 ~ 获取页面失败:', error)
      })
  })
}

export {
  getActressAvatar,
}
