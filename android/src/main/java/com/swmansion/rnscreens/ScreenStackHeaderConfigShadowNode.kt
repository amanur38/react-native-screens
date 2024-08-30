package com.swmansion.rnscreens

import android.util.Log
import com.facebook.react.bridge.ReactContext
import com.facebook.react.uimanager.LayoutShadowNode
import com.facebook.react.uimanager.Spacing
import com.swmansion.rnscreens.utils.PaddingBundle

internal class ScreenStackHeaderConfigShadowNode(
    private var context: ReactContext,
) : LayoutShadowNode() {
    var paddingStart: Float = 0f
    var paddingEnd: Float = 0f

    override fun setLocalData(data: Any?) {
        if (data is PaddingBundle) {
            Log.i("ShadowNode", "$data")
            paddingStart = data.paddingStart
            paddingEnd = data.paddingEnd

            setPadding(Spacing.START, paddingStart)
            setPadding(Spacing.END, paddingEnd)
//            markUpdated()
        } else {
            super.setLocalData(data)
        }

//        dirty()
//        markUpdated()
    }
}
