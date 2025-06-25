import React, { Suspense, useState, useEffect, useRef, useMemo } from 'react'
import { toast } from 'react-toastify'
import {
  Select as AntSelect,
  ConfigProvider,
  Button,
  Flex,
  Space,
  Row,
  Col,
  Form,
  Input,
} from 'antd'
import {
  getPosters,
  getPostersAll,
  deletePoster,
  getWorkersReport,
  createWorkersReport,
  deleteWorkersReport,
  createPereklichkaPoster,
} from '../http/postersApi'
import { parseShift } from '../utils/helpers'
import dayjs from 'dayjs'

const { TextArea } = Input

const RollCall = ({ inititalShiftData, crmId, setVisiblePereklichka }) => {
  const [specificity, setSpecificity] = useState('Улица')

  // const newList = useMemo(
  //   () => inititalSiftData.reduce(parseShift, {}),
  //   [inititalSiftData],
  // )
  const newList = inititalShiftData.reduce(parseShift, {})

  const [shifts, setShifts] = useState(Object.keys(newList).length > 0? newList[Object.keys(newList)[0]] : "Нет смен")
  const [shiftHours, setShiftHours] = useState(
    Object.keys(newList).length > 0? newList[Object.keys(newList)[0]][0] : "Нет смен",
  )
  const handleShiftChange = (value) => {
    setShifts(newList[value])
    setShiftHours(newList[value][0])
  }
  const onShiftHoursChange = (value) => {
    setShiftHours(value)
  }

  const onFinish = (values) => {
    const rollCallData = { ...values, crmId: crmId, rollCallTime: shiftHours, rollCallSpecificity: specificity  }
    setVisiblePereklichka(false)
    console.log(rollCallData)
    createPereklichkaPoster(rollCallData)
  }
  if (Object.keys(newList).length === 0) return <div>Нет смен</div>

  
  return (
    <Form
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 14 }}
      layout="horizontal"
      // style={{ maxWidth: 650 }}
      // onSubmit={handleSubmitPereklichka}
      onFinish={onFinish}
    >
      <Row gutter={16} style={{ marginBottom: '15px' }} justify="space-between">
        <Col className="gutter-row" span={10}>
          <Row
            gutter={16}
            style={{ marginBottom: '15px' }}
            justify="space-between"
          >
            <Col span={12}>
              <ConfigProvider
                theme={{
                  components: {
                    Select: {
                      selectorBg: '#131c21',
                      // border: 'none',
                      colorBorder: '#2d2e38',
                      // color: "#ffffff"
                      colorText: '#ffffff',
                      optionSelectedBg: '6c6666',
                      optionSelectedColor: '#ffffff',
                    },
                  },
                }}
              >
                <Form.Item
                  name="rollCallDate"
                  noStyle
                  initialValue={Object.keys(newList)[0]}
                >
                  <AntSelect
                    defaultValue={Object.keys(newList)[0]}
                    suffixIcon={null}
                    showSearch
                    name="Input"
                    style={{ width: '100%' }}
                    size="large"
                    styles={{
                      root: {
                        color: '#ffffff',
                        margin: 'auto',
                        textAlign: 'center',
                      },
                      popup: {
                        root: {
                          backgroundColor: '#131c21',
                          border: 'none',
                          margin: 'auto',
                          zIndex: '9999',
                          color: '#ffffff',
                        },
                      },
                    }}
                    onChange={handleShiftChange}
                    options={Object.keys(newList).map((shift) => ({
                      label: shift,
                      value: shift,
                    }))}
                  />
                </Form.Item>
              </ConfigProvider>
            </Col>

            <Col span={12}>
              <ConfigProvider
                theme={{
                  components: {
                    Select: {
                      selectorBg: '#131c21',
                      border: 'none',
                      colorBorder: '#2d2e38',
                      // color: "#ffffff"
                      colorText: '#ffffff',
                      optionSelectedBg: '6c6666',
                      optionSelectedColor: '#ffffff',
                    },
                  },
                }}
              >
                {/* <Form.Item name="shiftTime" noStyle initialValue={shiftHours}> */}
                <AntSelect
                  suffixIcon={null}
                  style={{ width: '100%' }}
                  size="large"
                  value={dayjs(shiftHours, 'DD.MM.YYYYTHH:mm').format('HH:mm')}
                  onChange={onShiftHoursChange}
                  options={shifts.map((shift) => ({
                    label: dayjs(shift, 'DD.MM.YYYYTHH:mm').format('HH:mm'),
                    value: shift,
                  }))}
                  styles={{
                    root: {
                      color: '#ffffff',
                      textAlign: 'center',
                    },
                    popup: {
                      root: {
                        backgroundColor: '#131c21',
                        border: 'none',
                        zIndex: '9999',
                        color: '#ffffff',
                      },
                    },
                  }}
                />
                {/* </Form.Item> */}
              </ConfigProvider>
            </Col>
          </Row>

          <Row gutter={16} justify="space-between">
            <Col span={12}>
              <ConfigProvider
                theme={{
                  components: {
                    Select: {
                      selectorBg: '#131c21',
                      border: 'none',
                      colorBorder: '#2d2e38',
                      // color: "#ffffff"
                      colorText: '#ffffff',
                      optionSelectedBg: '6c6666',
                      optionSelectedColor: '#ffffff',
                    },
                  },
                }}
              >
                <Form.Item name="rollCallStartScenario" noStyle initialValue={'120'}>
                  <AntSelect
                    suffixIcon={null}
                    defaultValue={{ label: '120 минут', value: '120' }}
                    optionFilterProp="label"
                    style={{ width: '100%' }}
                    size="large"
                    name="rollCallStartScenario"
                    options={[
                      { label: '180 минут', value: '180' },
                      { label: '150 минут', value: '150' },
                      { label: '120 минут', value: '120' },
                      { label: '90 минут', value: '90' },
                      { label: '60 минут', value: '60' },
                      { label: '30 минут', value: '30' },
                      { label: '15 минут', value: '15' },
                    ]}
                    styles={{
                      root: {
                        width: '100px',
                        color: '#ffffff',
                        textAlign: 'center',
                      },
                      popup: {
                        root: {
                          backgroundColor: '#131c21',
                          border: 'none',
                          zIndex: '9999',
                          color: '#ffffff',
                        },
                      },
                    }}
                  />
                </Form.Item>
              </ConfigProvider>
            </Col>

            <Col span={12}>
              <Form.Item name="rollCallSpecificity" noStyle>
                <div
                  style={{ width: '100%', cursor: 'pointer' }}
                  className="py-2  uley-data-main"
                  onClick={() =>
                    specificity === 'Улица'
                      ? setSpecificity('Помещение')
                      : setSpecificity('Улица')
                  }
                >
                  {specificity}
                </div>
              </Form.Item>
            </Col>
          </Row>
        </Col>

        <Col className="gutter-row" span={14}>
          <Form.Item
            hasFeedback
            rules={[{ required: true }]}
            name="rollCallTechText"
            noStyle
          >
            <TextArea
              style={{
                height: '100px',
                // width: '350px',
                resize: 'none',
                background: 'transparent',
                color: 'white',
                // border: 'none'
                borderColor: '#2d2e38'
              }}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={9}>
          <ConfigProvider
            theme={{
              components: {
                Select: {
                  selectorBg: '#131c21',
                  border: 'none',
                  colorBorder: '#2d2e38',
                  // color: "#ffffff"
                  colorText: '#ffffff',
                  optionSelectedBg: '6c6666',
                  optionSelectedColor: '#ffffff',
                },
              },
            }}
          >
            <Form.Item name="rollCallCondition" initialValue={'Мерч'} noStyle>
              <AntSelect
                suffixIcon={null}
                defaultValue={{
                  label: 'Мерч',
                  value: 'Мерч',
                  color: 'red',
                }}
                optionFilterProp="label"
                // onChange={onChange}
                // onSearch={onSearch}
                name="rollCallCondition"
                style={{ width: '100%' }}
                size="large"
                options={[
                  { label: 'Мерч', value: 'Мерч', color: 'red' },
                  { label: 'Дресс-код', value: 'Дресс-код', color: 'blue' },
                  {
                    label: 'Мерч | Дресс-код',
                    value: 'Мерч | Дресс-код',
                    color: 'blue',
                  },
                ]}
                styles={{
                  root: {
                    width: '100px',
                    color: '#ffffff',
                    textAlign: 'center',
                  },
                  popup: {
                    root: {
                      backgroundColor: '#131c21',
                      border: 'none',

                      zIndex: '9999',
                      color: '#ffffff',
                    },
                  },
                }}
              />
            </Form.Item>
          </ConfigProvider>
        </Col>
        <Col span={9}>
          <ConfigProvider
            theme={{
              components: {
                Select: {
                  selectorBg: '#131c21',
                  border: 'none',
                  colorBorder: '#2d2e38',
                  // color: "#ffffff"
                  colorText: '#ffffff',
                  optionSelectedBg: '6c6666',
                  optionSelectedColor: '#ffffff',
                },
              },
            }}
          >
            <Form.Item name="rollCallConditionStreet" noStyle initialValue={null}>
              <AntSelect
                suffixIcon={null}
                optionFilterProp="label"
                // onChange={onChange}
                // onSearch={onSearch}
                allowClear
                style={{ width: '100%' }}
                size="large"
                allowClear
                options={[
                  { label: 'Дождевик', value: 'Дождевик', color: 'red' },
                  {
                    label: 'Тёплая одежда',
                    value: 'Тёплая одежда',
                    color: 'black',
                  },
                  {
                    label: 'Дождевик | Теплая одежда',
                    value: 'Дождевик | Теплая одежда',
                    color: 'black',
                  },
                ]}
                styles={{
                  root: {
                    width: '100px',
                    color: '#ffffff',
                    textAlign: 'center',
                  },
                  popup: {
                    root: {
                      backgroundColor: '#131c21',
                      border: 'none',
                      zIndex: '9999',
                      color: '#ffffff',
                    },
                  },
                }}
              />
            </Form.Item>
          </ConfigProvider>
        </Col>

        <Col span={6}>
          <Button
            style={{ width: '100%' }}
            className="py-2  uley-data-main"
            size="large"
            type="text"
            htmlType="submit"
          >
            Отправить
          </Button>
        </Col>
      </Row>
    </Form>
  )
}

export default RollCall
