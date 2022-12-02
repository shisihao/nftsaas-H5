<template>
	<van-uploader v-show="show" :after-read="afterRead" :max-count="count" :max-size="maxSize" :before-read="beforeRead"
		@oversize="onOversize" />
</template>

<script setup>
import { ref, computed } from 'vue'
import axios from 'axios'
import { showToast } from 'vant'
import COS from 'cos-js-sdk-v5'
import store from '@/store/index'
import ObsClient from 'esdk-obs-browserjs/src/obs'
import { OssKey } from '@/utils/auth'
import { getCookieByKey } from '@/utils/cookies'

const oss = JSON.parse(getCookieByKey(OssKey) || '{}')

const props = defineProps({
	show: {
		type: Boolean,
		default: false
	},
	refName: {
		type: String,
		default: `upload${String(+new Date()) + Math.random().toString(36).substring(2)}`
	},
	count: {
		type: String,
		default: '1'
	},
	maxSize: {
		type: Number,
		default: 2 * 1024 * 1024
	}
})

const emit = defineEmits(['handleBeforeUpload', 'handleSuccess'])

const statusOptions = [
  { status: 'uploading', message: '上传中...' },
  { status: 'done', message: '上传成功' },
  { status: 'failed', message: '上传失败' }
]

const obs = {
  access_key_id: '3QZLEIDMZ7TAWELJTF8D',
  secret_access_key: 'U869tYGNQp1KnfUqGqeX61gP2Mm548DAk256YzH4',
  server: 'https://obs.cn-east-3.myhuaweicloud.com',
  timeout: 3000, // 设置超时时间

  Bucket: oss.bucket
}

var obsClient = new ObsClient({
  access_key_id: obs.access_key_id,
  secret_access_key: obs.secret_access_key,
  server: obs.server,
  timeout: obs.timeout
})

const afterRead = response => {
	// 上传中
  Object.assign(response, statusOptions[0])

  const { file, status, message } = response

  const filename = `${oss.folder}/${String(+new Date()) + Math.random().toString(36).substring(2)}.${file.name.split('.').pop()}`
  obsClient.putObject(
    {
      Bucket: obs.Bucket,
      Key: filename,
      SourceFile: file
    },
    function (err, result) {
      if (err) {
        // 上传失败
				showToast('上传失败')
        Object.assign(response, statusOptions[2])
      } else {
        // 上传成功
        Object.assign(response, statusOptions[1])
        // props.fileList.splice(props.fileList.length - 1, 1, { url: `${getCookieByKey(DomainKey)}${filename}`, ...statusOptions[1]})
        // emit('update:fileList', props.fileList)
        emit('handleSuccess', filename)
      }
    }
  )
}

const onOversize = () => {
	showToast('文件大小不能超过 2M')
}

const beforeRead = file => {
	return new Promise((resolve, reject) => {
		emit(
			'handleBeforeUpload',
			file,
			res => {
				if (res) {
					resolve(file)
				} else {
					reject()
				}
			},
			props.refName
		)
	})
}

</script>

<style lang="scss" scoped>

</style>
