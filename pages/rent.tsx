import React, { ChangeEventHandler, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { getAuth } from 'firebase/auth'
import { FieldValues, useForm } from 'react-hook-form'
import { v4 } from 'uuid'

import Button from '../components/atoms/Button'
import Container from '../components/atoms/Container'
import Input, { ERROR_MESSAGES } from '../components/atoms/Input'
import SEO from '../components/atoms/Seo'
import Wrapper from '../components/atoms/Wrapper'
import Layout from '../components/organisms/Layout'
import { createCycle, deleteCycle, updateCycle } from '../firebase/firestore'
import { uploadFile } from '../firebase/storage'
import Cycle from '../interfaces/Cycle'

import { useUser } from './_app'
const auth = getAuth()
export default function Rent({ cycle }: { cycle?: Cycle }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: { ...cycle, image: undefined, features: cycle?.features?.join(',') } || {},
  })
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  let displayImage =
    cycle?.image ||
    'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png'
  const { rawUser } = useUser()
  useEffect(() => {
    if (rawUser === undefined) return
    if (cycle && rawUser?.email !== cycle.host) {
      router.push('/')
    }

    if (rawUser === null) {
      router.push('/')
      return
    }
  }, [cycle, router])
  if (cycle && rawUser?.email !== cycle.host) return null

  if (!rawUser) {
    return null
  }
  const f: any = watch('image' as any)
  console.log(f)
  if (f?.item(0)) displayImage = URL.createObjectURL(f.item(0))
  function removeCycle() {
    setLoading(true)
    if (cycle && auth.currentUser?.email === cycle.host) {
      deleteCycle(cycle.id).then(() => {
        router.push('/')
      })
    }
  }
  async function onSubmit(data: FieldValues) {
    if (rawUser?.email) {
      const id = v4()
      setLoading(true)

      const image =
        cycle?.image === displayImage
          ? cycle.image
          : await uploadFile(data.image?.item(0), '/cycle/' + (cycle?.id || id))

      if (cycle && rawUser.email === cycle.host) {
        updateCycle(cycle.id, {
          features: data.features.split(','),
          gear: data.gear,
          model: data.model,
          price: data.price,
          title: data.title,
          image,
        }).then(() => {
          router.push('/cycle/' + cycle.id)
        })
      } else {
        createCycle({
          id,
          features: data.features.split(','),
          gear: data.gear,
          model: data.model,
          price: data.price,
          title: data.title,
          host: rawUser.email,
          image,
          rating: 0,
          timeAdded: new Date().getTime(),
        }).then(() => {
          alert('Added')
          router.push('/cycle/' + id)
        })
      }
    }
  }
  return (
    <Layout>
      <SEO title={cycle ? `Edit ${cycle.title} ${cycle.host}` : 'Rent a cycle'} />
      <Wrapper>
        <Container className={'my-10'}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={'mb-9 flex h-[150px]  '}>
              <Image
                height={150}
                width={150}
                onClick={() => {
                  document.getElementById('image')?.click()
                }}
                alt={'cycle'}
                className={'mx-auto w-auto cursor-pointer overflow-hidden rounded-xl object-center'}
                src={displayImage}
              />
            </div>

            <div className={'mb-5 text-center text-sm text-red-500'}>
              {ERROR_MESSAGES[errors['image']?.type as keyof typeof ERROR_MESSAGES]}
            </div>
            <input
              className={'hidden'}
              id={'image'}
              {...register('image', { required: !cycle })}
              // onChange={onFileChange}
              type={'file'}
            />

            <Input
              register={register('title', {
                required: true,
              })}
              label={'Title'}
              placeholder={'Enter the title'}
              errorCode={errors['title']?.type}
            />
            <Input
              type={'number'}
              register={register('price', {
                required: true,
                valueAsNumber: true,
                min: 1,
                max: 1000,
              })}
              label={'Price per slot'}
              placeholder={'Enter the price per slot'}
              errorCode={errors['price']?.type}
            />
            <Input
              register={register('model', {
                required: true,
              })}
              label={'Model'}
              placeholder={'Enter the Model of the cycle'}
              errorCode={errors['model']?.type}
            />
            <Input
              register={register('features')}
              label={'Features of the cycle, seperated by comma'}
              type={'textarea'}
              placeholder={'Features'}
              errorCode={errors['features']?.type}
            />
            <Input
              register={register('gear')}
              label={'Cycle has gear?'}
              type={'checkbox'}
              placeholder={'Does the cycle have gear'}
              errorCode={errors['gear']?.type}
            />
            <Button
              className={'mx-auto mt-4'}
              width={140}
              height={50}
              variant={'primary'}
              id={''}
              type={'submit'}
              disabled={loading}
            >
              {cycle ? 'Update' : 'Add'} Cycle
            </Button>
          </form>
          {cycle && (
            <Button
              className={'mx-auto mt-4 bg-yellow-400'}
              width={140}
              height={50}
              onClick={() => {
                setLoading(true)
                updateCycle(cycle.id, { paused: !cycle.paused }).then(() => router.push('/'))
              }}
              variant={'primary'}
              id={''}
              disabled={loading}
              type={'submit'}
            >
              {cycle?.paused && 'Un'}Pause cycle
            </Button>
          )}
          {cycle && (
            <Button
              className={'mx-auto mt-4 bg-red-500'}
              width={140}
              disabled={loading}
              height={50}
              onClick={removeCycle}
              variant={'primary'}
              id={''}
              type={'submit'}
            >
              Delete cycle
            </Button>
          )}
        </Container>
      </Wrapper>
    </Layout>
  )
}
