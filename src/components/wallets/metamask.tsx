import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { useWeb3React } from '@web3-react/core';
import { InjectedConnector, UserRejectedRequestError } from '@web3-react/injected-connector'


interface MetaMaskContextState {
    isConnected: boolean,
    account: string | null | undefined,
    connect: () => Promise<void>,
    disconnect: () => Promise<void>
}

interface Props {
    children: React.ReactNode
}

export const ChainId = {
    ETH: 1,
    MATIC: 137
}

const injected = new InjectedConnector({ supportedChainIds: [ChainId.MATIC, ChainId.ETH] })

export const MetaMaskContext = React.createContext({} as unknown as MetaMaskContextState)

export const MetaMaskProvider = ({ children }: Props) => {
    const { activate, account, library, connector, active, deactivate } = useWeb3React()
    const [isConnected, setIsConnected] = useState(false);

    // Connect to MetaMask wallet
    const connect = async () => {
        console.log('Connecting to MetaMask...')
        try {
            await activate(injected).then(() =>
                setIsConnected(true)
            )
        } catch (error) {
            console.log('Error on connecting: ', error)
        }
    }

    // Disconnect from Metamask wallet
    const disconnect = async () => {
        console.log('Disconnecting wallet from App...')
        try {
            await deactivate()
            setIsConnected(false)
        } catch (error) {
            console.log('Error on disconnect: ', error)
        }
    }

    const values = useMemo(
        () => ({
            account,
            isConnected,
            connect,
            disconnect
        }),
        [isConnected, account]
    )

    return <MetaMaskContext.Provider value={values}>{children}</MetaMaskContext.Provider>
}

export default function useMetaMask() {
    const context = React.useContext(MetaMaskContext)

    if (context === undefined) {
        throw new Error('useMetaMask hook must be used with a MetaMaskProvider component')
    }

    return context
}