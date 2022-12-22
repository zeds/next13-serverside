import React from 'react'

export default function Page({ params }:{params:any}) {
	console.log("lusty/page params.id=", params.id)
	return (
		<div>ID:{params.id}の詳細情報</div>
	)
}
