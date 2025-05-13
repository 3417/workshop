import { ref, onMounted, onUnmounted } from 'vue'

interface MenuOption {
  label: string
  handler: () => void
}

export function useContextMenu(options: MenuOption[]) {
  const showMenu = ref(false)
  const menuPosition = ref({ x: 0, y: 0 })

  const handleRightClick = (e: MouseEvent) => {
    e.preventDefault()
    showMenu.value = true
    menuPosition.value = { x: e.clientX, y: e.clientY }
  }

  const hideMenu = () => {
    showMenu.value = false
  }

  const handleClick = () => {
    hideMenu()
  }

  const handleKeydown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      hideMenu()
    }
  }

  onMounted(() => {
    window.addEventListener('click', handleClick)
    window.addEventListener('keydown', handleKeydown)
  })

  onUnmounted(() => {
    window.removeEventListener('click', handleClick)
    window.removeEventListener('keydown', handleKeydown)
  })

  return {
    showMenu,
    menuPosition,
    options,
    handleRightClick
  }
}