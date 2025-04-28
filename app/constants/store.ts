import { create } from 'zustand'

interface PopupState {
	isOpen: boolean
	message: string
	title: string
	// 팝업 상태 관리를 위한 액션들
	openPopup: (title: string, message: string) => void
	closePopup: () => void
}

export const usePopupStore = create<PopupState>((set) => ({
	isOpen: false,
	message: '',
	title: '',

	openPopup: (title: string, message: string) => {
		set({
			isOpen: true,
			title,
			message,
		})
	},

	closePopup: () => {
		set({
			isOpen: false,
			title: '',
			message: '',
		})
	},
}))
