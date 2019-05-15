# TCP

## Content

    Reliable "Byte Stream Service"

    "Byte Stream Service" -> split to "Segment"

### Connect & Close

Connect - 三次握手
|Package|Direction|Value|ClientStatus|ServerStatus|
|---|---|---|---|---|
|||||LISTEN|
|1.SYN    |C->S|SYN=1         Seq=X|SYN_SEND||
|2.SYN+ACK|C<-S|SYN=1 ACK=X+1 Seq=Y||SYN_RECV|
|3.ACK    |C->S|      ACK=Y+1 Seq=Z|ESTABLISHED|ESTABLISHED|

ClientClose - 四次挥手
|Package|Direction|Value|ClientStatus|ServerStatus|
|---|---|---|---|---|
|1.FIN+ACK|C->S|FIN=1 ACK=Z   Seq=X|FIN_WAIT_1||
|2.ACK    |C<-S|      ACK=X+1 Seq=Z|FIN_WAIT_2||
|         |C<-S|Server can send data to client|||
|3.FIN+ACK|C<-S|FIN=1 ACK=X   Seq=Y||CLOSE_WAIT|
|4.ACK    |C->S|      ACK=Y   Seq=X|TIME_WAIT|[CloseConnect]|
||2MSL later||[CloseConnect]||

ServerClose - 四次挥手
|Package|Direction|Value|ClientStatus|ServerStatus|
|---|---|---|---|---|
|1.FIN+ACK|C<-S|FIN=1 ACK=Z   Seq=X||FIN_WAIT_1|
|2.ACK    |C->S|      ACK=X+1 Seq=Z||FIN_WAIT_2|
|         |C->S|Client can send data to server|||
|3.FIN+ACK|C->S|FIN=1 ACK=X   Seq=Y|CLOSE_WAIT||
|4.ACK    |C<-S|      ACK=Y   Seq=X|[CloseConnect]|TIME_WAIT|
||2MSL later|||[CloseConnect]|
