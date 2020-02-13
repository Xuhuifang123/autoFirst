Component({
	options: {
		multipleSlots: true
	},
	properties: {
		/**
		 * {
		 *	 key: 0,        // 要插入的位置
		 *	 fixed: true,   // 额外节点是否固定
		 *	 slot: "test"   // 额外节点展示的所使用的 slot
		 * }
		 */
		// 插入正常节点之前的额外节点
		beforeExtraNodes: {
			type: Array,
			value: []
		},
		// 插入正常节点之后的额外节点
		afterExtraNodes: {
			type: Array,
			value: []
		},
		// 数据源
		listData: {
			type: Array,
			value: []
		},
		// 列数
		columns: {
			type: Number,
			value: 1
		},
		// 顶部高度
		topSize: {
			type: Number,
			value: 0
		},
		// 底部高度
		bottomSize: {
			type: Number,
			value: 0
		},
		// 页面滚动高度
		scrollTop: {
			type: Number,
			value: 0
		},
	},
	data: {
		/* 未渲染数据 */
		windowHeight: 0, // 视窗高度
		platform: '', // 平台信息
		realTopSize: 0, // 计算后顶部高度实际值
		realBottomSize: 0, // 计算后底部高度实际值
		itemDom: { // 每一项 item 的 dom 信息, 由于大小一样所以只存储一个
			width: 0,
			height: 0,
			left: 0,
			top: 0
		},
		itemWrapDom: { // 整个拖拽区域的 dom 信息
			width: 0,
			height: 0,
			left: 0,
			top: 0
		},
		startTouch: { // 初始触摸点信息
			pageX: 0,
			pageY: 0,
			identifier: 0
		},
		startTranX: 0, // 当前激活元素的初始 X轴 偏移量
		startTranY: 0, // 当前激活元素的初始 Y轴 偏移量
		preOriginKey: -1, // 前一次排序时候的起始 key 值

		/* 渲染数据 */
		list: [],
		cur: -1, // 当前激活的元素
		curZ: -1, // 当前激活的元素, 用于控制激活元素z轴显示
		tranX: 0, // 当前激活元素的 X轴 偏移量
		tranY: 0, // 当前激活元素的 Y轴 偏移量
		itemWrapHeight: 0, // 动态计算父级元素高度
		dragging: false, // 是否在拖拽中
		itemTransition: false, // item 变换是否需要过渡动画, 首次渲染不需要
	},
	methods: {
		
	},
	ready() {
		this.init();
	}
});
